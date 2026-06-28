"use server";

import { logger } from "@/lib/logger";
import { env } from "@/env.mjs";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const FETCH_TIMEOUT_MS = 15_000;

export async function subscribeToNewsletter(email: string) {
  const apiKey = env.KLAVIYO_PRIVATE_API_KEY;
  const listId = env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    logger.error("Configuration Error: Klaviyo API key or List ID missing.");
    return {
      success: false,
      error: "Configuration Error. Please contact support.",
    };
  }

  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {

    const response = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
      {
        signal: controller.signal,
        method: "POST",
        headers: {
          revision: "2026-04-15",
          accept: "application/vnd.api+json",
          "content-type": "application/vnd.api+json",
          Authorization: `Klaviyo-API-Key ${apiKey}`,
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
                            consent: "SUBSCRIBED",
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: listId,
                },
              },
            },
          },
        }),
      },
    );

    if (!response.ok) {
      logger.error(`Klaviyo API error: status ${response.status}`);
      return {
        success: false,
        error: "Failed to subscribe to newsletter. Please try again later.",
      };
    }

    return { success: true };
  } catch (error) {
    logger.error("Klaviyo subscription exception occurred:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
