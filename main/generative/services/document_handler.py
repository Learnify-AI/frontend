from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
from pathlib import Path
import google.generativeai as genai

class DocumentService:
    """Splits PDFs into pages and processes each with the Gemini API."""

    def __init__(self, model, output_dir="pdf_pages"):
        self.model = model
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)  # Create output directory if not exists

    def split_pdf(self, pdf_bytes):
        """Splits the PDF into individual pages and saves them as separate files."""
        reader = PdfReader(BytesIO(pdf_bytes))
        total_pages = len(reader.pages)

        for page_num in range(total_pages):
            writer = PdfWriter()
            writer.add_page(reader.pages[page_num])

            # Save each page as a separate PDF file
            page_file = self.output_dir / f"page_{page_num + 1}.pdf"
            with page_file.open("wb") as f:
                writer.write(f)
            print(f"Saved: {page_file}")
        
    def save_state(self, page_num, pdf_bytes):
        reader = PdfReader(BytesIO(pdf_bytes))
        writer = PdfWriter()
        writer.add_page(reader.pages[page_num])

        page_file = self.output_dir / f"page_{page_num + 1}.pdf"
        with page_file.open("wb") as f:
            writer.write(f)
            

    def ocr_pdf(self, pdf_file_path):
        """Perform OCR on a single-page PDF using Gemini API."""
        sample_file = genai.upload_file(path=pdf_file_path)
        print(f"Uploaded {pdf_file_path} to Gemini")
        response = self.model.generate_content(["Extract text from this file:", sample_file])
        return response.text

    def process_next_page(self):
        """
        Processes the next available page by calling the Gemini API.
        Deletes the page after processing to free space.
        """
        page_files = sorted(self.output_dir.glob("page_*.pdf"))  # List pages in order

        if not page_files:
            print("All pages processed.")
            return ""

        next_page = page_files[0]  # Get the first page
        print(f"Processing: {next_page}")
        text = self.ocr_pdf(str(next_page))  # Process with Gemini API

        # Delete the page after processing
        next_page.unlink()
        print(f"Deleted: {next_page}")
        return text

    def reset(self):
        """Reset the service by deleting all saved pages."""
        for file in self.output_dir.glob("page_*.pdf"):
            file.unlink()
        print("Reset complete. All pages deleted.")
