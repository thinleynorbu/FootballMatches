import { DatePicker } from "antd";
import { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

interface Props {
    onChange: (name: string, value: string) => void;
    placeholder?: string;
    className?: string;
    name?: string;
    ref?: React.MutableRefObject<undefined>;
    clear?: boolean;
    setClear?: React.Dispatch<React.SetStateAction<boolean>>;
    open?: boolean;
    dropdownClassName?: string;
    disabledDate?: (currentDate: Moment) => boolean;
    initialValue?: Moment | undefined;
    onClear?: () => void;
    label: string;
}

const useStyles = createUseStyles((theme: any) => {
    return {
        picker: {
            borderRadius: "3px",
            color: theme.formLabelColor,
            padding: "8px 10px 8px 15px",
            width: "100%",
            "& input": {
                fontSize: "16px",
                lineHeight: "22px"
            },
            "& .ant-picker-suffix": {
                display: "flex",
                "& span": {
                    fontSize: 16
                }
            },
            "& .ant-picker-clear": {
                display: "flex",
                "& span": {
                    fontSize: 16
                }
            }
        },
        label: {
            fontSize: 14,
            color: theme.formLabelColor,
            display: "flex",
            lineHeight: "20px",
            "& > :first-child": {
                padding: 0
            }
        },
    };
});

export const DatePickerComponent = ({
    onChange,
    placeholder = "Select Date",
    className,
    name,
    clear,
    setClear,
    open,
    disabledDate,
    dropdownClassName,
    initialValue,
    onClear,
    label
}: Props) => {
    const classes = useStyles();

    const [value, setValue] = useState(initialValue as Moment | null);

    const handleChange = (date: Moment | null) => {
        console.log(date,"date date")
        if (name === "from") {
            date?.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        }
        if (name === "to") {
            date?.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
        }
        setValue(date);
        if (clear && setClear) {
            setClear(false);
        }
        if (date === null) {
            onClear!();
        }

        onChange(name || "", date?.toJSON() || "");
    };

    useEffect(() => {
        if (clear) {
            setValue(null);
        }
    }, [clear]);

    useEffect(() => {
        setValue(initialValue || null);
    }, [initialValue]);

    return (
        <>
            <div
                className={classes.label}
            >
                {label}
            </div>
            <DatePicker
                value={value}
                name={name}
                disabledDate={disabledDate}
                className={`${classes.picker} ${className}`}
                placeholder={placeholder}
                onChange={handleChange}
                open={open}
                dropdownClassName={dropdownClassName}
                defaultValue={initialValue}
            />
        </>
    );
};