import { CheckboxWrapper, Span } from "../../../styles";

export const EditCheckbox = ({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <>
        {" "}
        <Span>You want to be a manger?</Span>
        <CheckboxWrapper>
            <input
                type="checkbox"
                id="_checkbox"
                checked={checked}
                onChange={onChange}
                title="Checkbox"
            />
            <label htmlFor="_checkbox">
                <div className="tick_mark"></div>
            </label>
        </CheckboxWrapper>
    </>
);
