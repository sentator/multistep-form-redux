import React from "react";
import { useField } from "formik";

import { transformFileList } from "../../utils";
import InputFile from "../inputFile/InputFile";
import AttachedFilesList from "../attachedFilesList/AttachedFilesList";

import "./attachInvoice.scss";

interface AttachInvoiceProps {
	name: string;
	id: string;
	initialValue: File[] | null;
	acceptedFormats: File["type"][];
}

const AttachInvoice: React.FC<AttachInvoiceProps> = ({ name, id, initialValue, acceptedFormats }) => {
	const [field, _, { setValue }] = useField(name);
	const [attachedFiles, setAttachedFiles] = React.useState(initialValue);

	const attachFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
		const attachedFiles = transformFileList(event.target.files);

		const existingFiles = field.value ? (field.value as File[]) : [];
		const newFiles = attachedFiles.filter((file) => {
			return !existingFiles.some(
				(existingFile) => existingFile.name === file.name && existingFile.size === file.size
			);
		});

		const result = [...existingFiles, ...newFiles];
		setAttachedFiles(result);
		setValue(result, true);
	};

	const removeAttachedFile = (index: number) => {
		if (attachedFiles) {
			const filteredFiles = attachedFiles.filter((_, i) => i !== index);

			if (filteredFiles.length) {
				setAttachedFiles(filteredFiles);
				setValue(filteredFiles, true);
			} else {
				setAttachedFiles(null);
				setValue(null, true);
			}
		}
	};

	return (
		<div className="section-invoice-attachment">
			<h3 className="section-invoice-attachment__title">Рахунок-фактура</h3>
			<div className="section-invoice-attachment__description">
				<p>
					Завантажте рахунок-фактуру вашого замовлення необхідний митній службі України з метою розмитнення
					замовлення. Знайти його можна на електроній пошті або в особистому кабінеті інтернет-магазину.
				</p>
				<p>Будь-який зручний для вас формат: jpg, png, pdf</p>
			</div>
			<div className="section-invoice-attachment__input">
				<InputFile
					name={name}
					id={id}
					label="Завантажити файли"
					acceptedFormats={acceptedFormats.join(", ")}
					addFiles={attachFiles}
				/>
			</div>
			{!!attachedFiles && (
				<div className="section-invoice-attachment__files">
					<AttachedFilesList files={attachedFiles} removeFile={removeAttachedFile} />
				</div>
			)}
		</div>
	);
};
export default AttachInvoice;
