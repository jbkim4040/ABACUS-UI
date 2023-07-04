import { useState } from "react";


const ImageUploader = ({param}) => {
    const [name, setName] = useState(param);
    console.log("ImageUploader속성 name :: " + name);

    return(
        <>
            {param}
        </>
    );
}

export default ImageUploader;