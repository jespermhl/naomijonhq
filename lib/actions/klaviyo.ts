"use server";

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
    console.error("KLAVIYO_PRIVATE_API_KEY or KLAVIYO_LIST_ID is not defined.");
    return { success: false, error: "Configuration Error" };
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
                    email: email,
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
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch (e) {
        errorData = { errors: [{ detail: text }] };
      }
      console.error("Klaviyo API error:", errorData);
      return { success: false, error: errorData.errors?.[0]?.detail || "Failed to subscribe" };
    }

    return { success: true };
  } catch (error) {
    console.error("Newsletter subscription exception:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
