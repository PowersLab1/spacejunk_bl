import React, { useEffect, useState } from 'react'
import { awsFetchLink } from '../functions/saveTaskData';

export const Redirect = ({link, encryptedMetadata}) => {
    const [urlLink, setURLLink] = useState(link);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        if (urlLink === undefined || urlLink === "" || urlLink === null || urlLink === "undefined") {
            // While we have less tried less than 10 times
            if (attempts < 10) {
                async function awsFetch(encryptedMetadata) {
                    const response = await awsFetchLink(encryptedMetadata);
                    console.log(response);
                    if (response === null) {
                        console.log("Updating");
                        setAttempts(attempts + 1);
                        // await setTimeout(() => {
                        // }, 2000);
                    }
                    else {
                        setURLLink(response.link);
                    }
                }
                awsFetch(encryptedMetadata);
            }
        }
    }, [attempts, urlLink])
    if (urlLink) {
        console.log(urlLink);
        window.location.href = urlLink;
        return null;
    }
    else {
        return (
            <h3>Unable to Redirect, please return to REDCap manually.</h3>
        ) 

    }
}
