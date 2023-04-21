import Input from "../input/Input";

import "./sectionTracking.scss";

interface SectionTrackingProps {
	name: string;
	id: string;
	readonly?: boolean;
}

const SectionTracking: React.FC<SectionTrackingProps> = (props) => {
	const { name, id, readonly = false } = props;
	return (
		<div className="section-tracking">
			<div className="section-tracking__input">
				<Input name={name} id={id} label="Трек-номер" readOnly={readonly} />
			</div>
			<div className="section-tracking__description">
				Ще не отримали трек номер? Створіть відправлення та додайте трек номер пізніше. Без трек номеру ми не
				зможемо доставити вашу посилку
			</div>
		</div>
	);
};

export default SectionTracking;
