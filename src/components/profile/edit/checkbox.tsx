import React, { forwardRef } from "react";
import { CheckboxWrapper, Span } from "../../../styles";

interface EditCheckboxProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditCheckbox = forwardRef<HTMLInputElement, EditCheckboxProps>(
    ({ checked, onChange }, ref) => (
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
                <div className="tick_mark">
                    <p hidden>Do you want to be a manager?</p>
                </div>
            </label>
            <Span>
                {checked
                    ? "You are a manager. Uncheck the circle to be a regular user."
                    : "Check the circle to be a manager."}
            </Span>
        </CheckboxWrapper>
    )
);

// Set the display name for debugging
EditCheckbox.displayName = "EditCheckbox";
