import { UploadedFile } from "../types";

export const transformInvoiceItemToFile = async (item: UploadedFile): Promise<File> => {
	const extensionStartIndex = item.fileName.indexOf(".");
	const fileExtension = item.fileName.slice(extensionStartIndex + 1);
	let options: { type: string } | undefined = undefined;

	switch (fileExtension) {
		case "png":
			options = { type: "image/png" };
			break;
		case "jpg":
			options = { type: "image/jpeg" };
			break;
		case "pdf":
			options = { type: "application/pdf" };
			break;
		default:
			break;
	}

	const file = await fetch(item.fileUrl)
		.then((r) => r.blob())
		.then((blobFile) => new File([blobFile], item.originalName, options));

	return file;
};
