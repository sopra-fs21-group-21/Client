import React from "react";
import {InputField} from "../design/InputField";
import {Label} from "../design/Label";
import {Container} from "../Containers/Container";




const ProfileInfoToChange = ({ InfoToChange, type }) => {
    return (
        <Container>
            <Label>
              New {InfoToChange}
            </Label>
            <InputField type={type}/>

            <Label>
                Confirm New {InfoToChange}
            </Label>
            <InputField type={type}/>
        </Container>

    );
};

export default ProfileInfoToChange;
