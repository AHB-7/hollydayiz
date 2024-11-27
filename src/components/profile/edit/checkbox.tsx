import React, { forwardRef } from "react";
import { CheckboxWrapper, Span } from "../../../styles";

interface EditCheckboxProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditCheckbox = forwardRef<HTMLInputElement, EditCheckboxProps>(
    ({ checked, onChange }, ref) => (
        <>
            <Span>Do you want to be a manager?</Span>
            <CheckboxWrapper>
                <input
                    type="checkbox"
                    id="_checkbox"
                    checked={checked}
                    onChange={onChange}
                    ref={ref}
                    title="Checkbox"
                />
                <label htmlFor="_checkbox">
                    <div className="tick_mark"></div>
                </label>
            </CheckboxWrapper>
        </>
    )
);

// Set the display name for debugging
EditCheckbox.displayName = "EditCheckbox";
