import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()


class OpenRouterClient:
    """
    Simple OpenRouter API client.

    This client is responsible only for talking to
    OpenRouter.

    It does NOT know anything about resumes.
    """

    BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

    def __init__(self):

        self.api_key = os.getenv("OPENROUTER_API_KEY")

        self.model = os.getenv(
            "OPENROUTER_MODEL",
            "google/gemini-2.5-flash",
        )

    # --------------------------------------------------

    def is_configured(self) -> bool:
        return bool(self.api_key)

    # --------------------------------------------------

    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
    ) -> str:

        if not self.api_key:
            raise RuntimeError(
                "OPENROUTER_API_KEY not found."
            )

        headers = {

            "Authorization": f"Bearer {self.api_key}",

            "Content-Type": "application/json",
        }

        payload = {

            "model": self.model,

            "temperature": temperature,

            "messages": [

                {
                    "role": "system",
                    "content": system_prompt,
                },

                {
                    "role": "user",
                    "content": user_prompt,
                },

            ],
        }

        response = requests.post(

            self.BASE_URL,

            headers=headers,

            json=payload,

            timeout=120,

        )

        response.raise_for_status()

        data = response.json()

        return data["choices"][0]["message"]["content"]

    # --------------------------------------------------

    def json_chat(
        self,
        system_prompt: str,
        user_prompt: str,
    ):

        reply = self.chat(
            system_prompt,
            user_prompt,
        )

        reply = reply.strip()

        if reply.startswith("```json"):
            reply = reply[7:]

        if reply.startswith("```"):
            reply = reply[3:]

        if reply.endswith("```"):
            reply = reply[:-3]

        reply = reply.strip()

        return json.loads(reply)


_client = None


def get_client() -> OpenRouterClient:
    global _client

    if _client is None:
        _client = OpenRouterClient()

    return _client


client = get_client()