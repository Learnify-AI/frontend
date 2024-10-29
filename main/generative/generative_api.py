import os
import google.generativeai as genai
from main.generative.services.config import AudioConfig, BaseConfig, DocumentConfig, QuizConfig, ChatConfig
from main.generative.service_manager import Service
from dotenv import load_dotenv

load_dotenv()



genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))
class Generate:
    def __init__(self, config=BaseConfig):
        self.model = genai.GenerativeModel(
            model_name=config.model_name,
            generation_config={
                "temperature": config.temperature,
                "top_p": config.top_p,
                "top_k": config.top_k,
                "max_output_tokens": config.max_output_tokens,
                "response_mime_type": config.response_mime_type,
            },
            system_instruction=config.system_instruction
        )

        self.factory = Service(model=self.model)

    def execute(self, service_type, **kwargs):
        service = self.factory.get_service(service_type)
        return service.execute(**kwargs)
    

        
# Example usage
if __name__ == "__main__":
    gen = Generate(config=ChatConfig)

    # Generate text
    # print(gen.execute("text", prompt="Write a poem"))

    # Generate quiz questions
    while True:
        text = gen.execute("chat")

    # Generate audio from text
    # gen.execute("audio", text=text, output_file="audio.mp3")
