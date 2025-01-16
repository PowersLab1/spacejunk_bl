
/**
 * Adds a script to the HTML Document
 * @param {*} src 
 * @param {*} scriptId 
 * @returns 
 */
export default function addScript(src, scriptId) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = src;
    script.type = "module";
    document.head.appendChild(script);
    return
}