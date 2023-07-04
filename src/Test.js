import { useState } from "react";
import { Button } from "antd";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ImageUploader from "./ImageUploader";





const Test = () => {

    const [conponent, setComponent] = useState('LogIn');
    let activatedComponent;

    if(conponent === 'LogIn'){
        activatedComponent = <LogIn />;
    }else if(conponent === 'SignUp'){
        activatedComponent = <SignUp />;
    }


    const nextComponentHandler = () => {
        if(conponent === 'LogIn'){
            setComponent('SignUp');
        }
    }

    const preComponentHandler = () => {
        if(conponent === 'SignUp'){
            setComponent('LogIn');
        }
    }

    return (
        <>
            {/* {activatedComponent}
            <Button onClick={preComponentHandler}>이전</Button>
            <Button onClick={nextComponentHandler}>다음</Button> */}
            <ImageUploader name='테스트' />
        </>
    );
}

export default Test;