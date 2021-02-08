import { Select } from "antd";
import React from "react";
import { createUseStyles } from "react-jss";

interface Option {
    label: string;
    value: string;
    disable?: boolean;
}

interface Props {
    options: any | Option[];
    value?: string | number;
    label?: string;
    error?: string | boolean | number;
    name: string;
    placeholder?: string;
    className?: string;
    showSearch?: boolean;
    wrapperClassName?: string;
    size?: "small" | "middle" | "large";
    allowClear?: boolean;
    onChange: (field: string, value: any) => any;
    disabled?: boolean;
    defaultValue?: string;
    labelFontSize?: number;
    id?: string;
    useLabel?: boolean;
}

let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        },
        text: {
            lineHeight: "30px",
            borderRadius: 3,
            marginBottom: 20,
            marginTop: 4,
            width: "100%",
            "& .ant-select-selector": {
                display: "flex",
                height: "40px !important",
                borderRadius: "3px !important",
                alignItems: "center"
            }
        },
        label: {
            marginBottom: "0",
            fontSize: 14,
            display: "flex",
            lineHeight: "20px",
            "& > :first-child": {
                padding: 0
            }
        },
        labelContainer: {
            display: "flex",
            alignItems: "center",
            marginBottom: -4
        },
        maxHolder: {
            borderRadius: 2,
            border: "1px solid #C9C9C9",
            width: 32,
            height: 13,
            fontSize: 9,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 8
        },
        select: {
            width: "100%"
        },
        loadingField: {
            "& .ant-select-selector": {
                background: "#fff !important",
                color: "#000 !important"
            }
        },
        error: {
            marginTop: -20,
            marginBottom: 0,
            fontSize: 12,
            color: theme.error,
            fontWeight: 300,
            display: "flex",
            lineHeight: "20px"
        },
        dropdown: {
            borderRadius: 3
        }
    };
});

export const SelectComponent = ({
    label,
    options,
    value,
    name,
    placeholder,
    className,
    showSearch,
    size,
    wrapperClassName,
    allowClear,
    onChange,
    disabled,
    defaultValue,
    error,
    id,
    useLabel
}: Props) => {
    const { Option } = Select;
    const classes = useStyles();

    const handleChange = (value: any) => {
        onChange(name, value);
    };

    return (
        <div className={`${classes.container} ${wrapperClassName}`}>
            <div className={classes.labelContainer}>
                {label && (
                    <span
                        className={classes.label}
                    >
                        {label}
                    </span>
                )}
            </div>
            <div
                className={classes.select}
                id={id}
            >
                <Select
                    className={`${classes.text} ${className}`}
                    value={value}
                    onChange={handleChange}
                    placeholder={disabled ? "" : placeholder}
                    dropdownClassName={classes.dropdown}
                    size={size || "small"}
                    showSearch={showSearch}
                    allowClear={allowClear}
                    disabled={disabled}
                    defaultValue={defaultValue}
                >
                    {options.map((option: Option) => {
                        return (
                            <Option
                                disabled={option.disable}
                                key={useLabel ? option.label : option.value}
                                value={useLabel ? option.label : option.value}
                            >
                                {option.label}
                            </Option>
                        );
                    })}
                </Select>
            </div>
            {error && <p className={classes.error}>{error}</p>}
        </div>
    );
};
