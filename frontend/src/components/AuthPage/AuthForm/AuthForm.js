import React, {Component} from "react";
import axios from "axios";
import {API, AXIOS_CONFIG} from "../../../const/const";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./AuthForm.css";
import {TECH_SUPPORTERS} from "../../../const/mockData";

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            error: ""
        };
        this.changeCode = this.changeCode.bind(this);
        this.sendAuthFrom = this.sendAuthFrom.bind(this);
    }

    changeCode(e) {
        this.setState({
            code: e.target.value
        });
    }

    sendAuthFrom() {
        this.setState({error: ""})
        axios.post(API.SESSION, {code: this.state.code}, AXIOS_CONFIG).then(
            res => {
                this.props.setUser(res.data)
            }
        ).catch(e => {
            this.setState({error: "Не удалось войти"})
        });
    }

    render() {
        return (
            <div className={"auth_form"}>
                <p className={"form_header"}>Вход</p>
                <Input
                    value={this.state.code}
                    onChange={this.changeCode}
                    type={"number"}
                    placeholder={"Пароль"}/>
                <Button onClick={this.sendAuthFrom}>Войти</Button>
                <p className={"color_pink"}>{this.state.error}</p>
                <br/>
                <div className={"tech_support"}>
                    <p className={"font_size_less nowrap"}>Технические вопросы по подключению к трансляции</p>
                    <div className={"login_supporters"}>
                        {TECH_SUPPORTERS.map((supporter) => <p key={supporter.phone}
                                                               className={"font_size_less"}>{supporter.name} <a
                            className={"white_link"} href={"tel:" + supporter.phone}>{supporter.phone}</a></p>)}
                    </div>
                </div>
            </div>
        );
    }
}
