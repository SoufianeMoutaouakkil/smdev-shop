export default function (envVarName) {
    const envVarNameWithVite = "REACT_APP_" + envVarName;
    const envVar = process.env[envVarNameWithVite];
    if (!envVar) {
        throw new Error(
            `Environment variable ${envVarNameWithVite} is not defined.`
        );
    }
    return envVar;
}
