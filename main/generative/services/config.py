class BaseConfig:
    model_name = "gemini-1.5-flash"
    temperature = 1
    top_p = 0.95
    top_k = 64
    max_output_tokens = 8192
    response_mime_type = 'text/plain'
    system_instruction = ""

# Specific Configs for Different Tasks
class AudioConfig(BaseConfig):
    pass

class DocumentConfig(BaseConfig):
    top_k = 36
    model_name="models/gemini-1.5-flash-002"
    system_instruction = "Get the text from the file"

class QuizConfig(BaseConfig):
    system_instruction = (
        "You are provided with the following content. Your task is to analyze the material and generate questions "
        "strictly based on the information in the content.\n"
        "1. Extract key information from the content above and generate *at least 5 multiple-choice questions*.\n"
        "2. Each question should have *4 answer options*, with one correct answer clearly marked.\n"
        "3. Format your response as a *JSON object* using the following structure:\n\n"
        "```json\n"
        "{\n"
        "  \"questions\": [\n"
        "    {\n"
        "      \"question\": \"<Your question text here>\",\n"
        "      \"options\": [\n"
        "        \"Option 1\",\n"
        "        \"Option 2\",\n"
        "        \"Option 3\",\n"
        "        \"Option 4\"\n"
        "      ],\n"
        "      \"correct_answer\": \"Correct option here\"\n"
        "    }\n"
        "  ]\n"
        "}\n"
        "```"
    )

class TextConfig(BaseConfig):
    pass

class SummarizeConfig(BaseConfig):
    system_instruction = (
        "You are provided with the following content. Your task is to summarize it in a concise manner.\n"
        "1. Generate a brief summary that captures the main ideas and key points.\n"
        "2. The summary should be no more than 150-200 words.\n"
        "3. Do not include any suggestions for improvement or additional commentary.\n"
        "4. Only respond with the summarized text, nothing else."
    )

class ChatConfig(BaseConfig):
    system_instruction = (
        "You are provided with the following text. all you need to do is to answer it.\n"
        "1. Answer only questions strictly related to this topic.\n"
        "2. If the question is related, provide a detailed and relevant response based on the topic provied.\n"
        "3. If the question is not related, respond with: The question you asked is not in the topic above.\n"
        "4. Do not answer any question related to Chat ID, respond with: The question you asked is not in the topic above.\n"
    )
