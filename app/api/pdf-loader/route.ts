import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const pdfUrl =
  "https://firebasestorage.googleapis.com/v0/b/website-backend-5e67e.appspot.com/o/pdfind%2FMIDTERM-NETWORKING-DEVICES-AND-INITIAL-CONFIGURATION.pdf?alt=media&token=988226df-60ce-4f0c-af34-26e598df0313";
export async function GET() {
  try {
    // load the pdf file
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = "";
    docs.forEach((doc) => {
      pdfTextContent = pdfTextContent + doc.pageContent;
    });

    // split the text into smaller chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    const output = await splitter.createDocuments([pdfTextContent]);

    const splitterList: string[] = [];
    output.forEach((doc) => {
      splitterList.push(doc.pageContent as string);
    });

    return NextResponse.json({ result: splitterList, status: "SUCCESS" });
  } catch (error) {
    console.log("LANGCHAIN PDF PARSER ERROR: ", error);
    return NextResponse.json({ result: [], status: "ERROR" });
  }
}
