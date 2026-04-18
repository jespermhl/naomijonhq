"use server";

/**
 * Normalizes an email address by trimming whitespace and converting to lowercase.
 */
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Validates an email address using a robust regex.
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Subscribes a user to the Klaviyo newsletter list.
 * Uses the Bulk Subscribe Profiles endpoint as per Klaviyo API v2026-04-15.
 * 
 * @param email - The email address to subscribe.
 * @returns An object indicating success or failure.
 */
export async function subscribeToNewsletter(email: string) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    console.error("Configuration Error: Klaviyo API key or List ID missing.");
    return { success: false, error: "Configuration Error. Please contact support." };
  }

  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  try {
    const response = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs", {
      method: "POST",
      headers: {
        "revision": "2026-04-15",
        "accept": "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        "Authorization": `Klaviyo-API-Key ${apiKey}`
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: "Newsletter Signup Form",
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email: normalizedEmail,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED"
                        }
                      }
                    }
                  }
                }
              ]
            }
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: listId
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      // Log sanitized status, do not log raw payload to avoid PII exposure
      console.error(`Klaviyo API error: status ${response.status}`);
      return { success: false, error: "Failed to subscribe to newsletter. Please try again later." };
    }

    return { success: true };
  } catch (error) {
    // Log generic error message server-side
    console.error("Klaviyo subscription exception occurred.");
    return { success: false, error: "An unexpected error occurred. Please try again later." };
  }
}
