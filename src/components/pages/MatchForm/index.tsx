import React, { useEffect, useState } from 'react';
import { createUseStyles } from "react-jss";
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { DatePickerComponent } from '../../atoms/Datepicker';
import { TextField } from '../../atoms/Input';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { API } from '../../../api';
import { Alert } from '../../atoms/Alert';
import moment, { Moment } from 'moment';
import { SelectComponent } from '../../atoms/Select';

let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            paddingTop: 30,
            width: "100%"
        },
        header: {
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 24
        },
        form: {
            width: "60%"
        },
        input: {
            marginBottom: 15,
            width: '50%'
        },
        row: {
            display: 'flex',
            justifyContent: "space-between",
            marginBottom: 25
        },
        submit: {
            marginTop: 15,
            width: "25%"
        },
        formWrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
        backButton: {
            marginRight: 50,
            fontSize: 22,
            marginLeft: 15
        },
        select: {
            width: '50%',
            marginRight: 20
        }
    };
});

interface formValue {
    homeTeam: string;
    awayTeam: string
    homeScore: string
    awayScore: string
    date: Moment | null
}

interface TeamsOptions {
    label: string;
    value: string;
    disable?: boolean
}

const MatchForm = () => {
    const classes = useStyles();
    const history = useHistory()
    const { id }: any = useParams();
    const [loading, setLoading] = useState(false as boolean);
    const [formValue, setFormValue] = useState({
        homeTeam: "",
        awayTeam: "",
        homeScore: "",
        awayScore: "",
        date: null
    } as formValue);
    const [formError, setFormError] = useState({
        homeTeam: "",
        awayTeam: "",
        homeScore: "",
        awayScore: "",
        date: ""
    });
    const [teams, setTeams] = useState([] as TeamsOptions[]);

    const fetchMatch = async () => {
        try {
            setLoading(true)
            const res = await API.get(`match/${id}`);
            const data = res.data;
            setFormValue({
                homeTeam: data.homeTeam,
                awayTeam: data.awayTeam,
                homeScore: data.homeScore,
                awayScore: data.awayScore,
                date: data.date
            })
            setLoading(false)
        } catch (err) {
            Alert(err.response.statusText, "error")
            setLoading(false)
            history.push("/")
        }
    }

    const fetchTeams = async () => {
        const res = await API.get('teams');
        const data = res.data;
        const teamList: any = []
        if (data.length > 0) {
            data.forEach((item: any, index: number) => {
                teamList[index] = { label: "", value: "" }
                teamList[index].label = item.name;
                teamList[index].value = item.id;
            })
            setTeams([...teamList])
        }
    }
    useEffect(() => {
        fetchTeams()
        if (id) {
            fetchMatch()
        }
    }, [id])

    const updateTeamList = () => {
        const updatedTeams: any = []
        teams.forEach((item, index) => {
            updatedTeams[index] = item
            updatedTeams[index].disable = false;
            if (item.label === formValue.awayTeam || item.label === formValue.homeTeam) {
                updatedTeams[index].disable = true;
            }
        })
        setTeams([...updatedTeams])
    }

    useEffect(() => {
        updateTeamList()
    }, [formValue])

    const handleChange = (data: any, date?: any) => {
        if (date) {
            setFormValue({ ...formValue, [data]: date })
            return;
        }
        if (data !== 'date') {
            setFormValue({ ...formValue, [data.target.name]: data.target.value })
        }
    }
    const handleSelectChange = (name: string, value: any) => {
        setFormValue({ ...formValue, [name]: value })
    }
    const validate = () => {
        const errors: any = {};
        let toContinue = true;
        Object.entries(formValue).map(item => {
            if (item[1] === "" || !item[1]) {
                const name = item[0]
                errors[name] = "Required"
                toContinue = false
            }
            if ((item[0] === "homeScore" || item[0] === "awayScore") && (item[1] < 0 || item[1] < 0)) {
                const name = item[0]
                errors[name] = "Enter zero or positive number"
                toContinue = false
            }
        })
        setFormError({ ...errors })
        return toContinue;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setLoading(true)
            const isValid = validate();
            if (isValid) {
                if (id) {
                    await API.put(`/match/${id}`, formValue)
                    Alert("Match Edited", "success")
                } else {
                    await API.post('/match', formValue)
                    Alert("Match added", "success")
                }
                history.push('/')
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            Alert("Error occured", "error")
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.backButton}>
                <ArrowLeftOutlined onClick={() => history.goBack()} />
            </div>
            <div className={classes.formWrapper}>
                <div className={classes.header}>
                    {id ? "Edit Match" : " Add Match"}
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.row}>
                        <SelectComponent
                            options={teams}
                            onChange={handleSelectChange}
                            name={"homeTeam"}
                            placeholder={"Home Team"}
                            label={"Home Team"}
                            value={formValue.homeTeam}
                            error={formError.homeTeam}
                            wrapperClassName={classes.select}
                            useLabel
                        />
                        <TextField
                            wrapperClass={classes.input}
                            label={"Score"}
                            name={"homeScore"}
                            placeholder={"Score"}
                            onChange={handleChange}
                            type="number"
                            editValue={formValue.homeScore}
                            error={formError.homeScore}
                            positive
                        />
                    </div>
                    <div className={classes.row}>
                        <SelectComponent
                            options={teams}
                            onChange={handleSelectChange}
                            name={"awayTeam"}
                            placeholder={"Away Team"}
                            label={"Away Team"}
                            value={formValue.awayTeam}
                            error={formError.awayTeam}
                            wrapperClassName={classes.select}
                            useLabel
                        />
                        <TextField
                            wrapperClass={classes.input}
                            label={"Score"}
                            name={"awayScore"}
                            placeholder={"Score"}
                            type="number"
                            editValue={formValue.awayScore}
                            error={formError.awayScore}
                            onChange={handleChange}
                            positive
                        />
                    </div>
                    <DatePickerComponent
                        label={"Match Date"}
                        name={"date"}
                        clear={false}
                        initialValue={formValue.date ? moment(formValue.date) : undefined}
                        onClear={() => setFormValue({ ...formValue, date: null })}
                        onChange={handleChange}
                        error={formError.date}
                    />
                    <Button
                        loading={loading}
                        htmlType={"submit"}
                        className={classes.submit}
                        type={"primary"}
                    >
                        Submit
                </Button>
                </form>
            </div>
        </div>
    )
}

export default MatchForm;