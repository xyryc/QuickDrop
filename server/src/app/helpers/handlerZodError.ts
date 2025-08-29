import { TErrorSources, TGenericErrorResponse } from "../interface/error.typs"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handlerZodError = (err: any): TGenericErrorResponse => {
    const errorSources: TErrorSources[] = []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err.issues.forEach((issue: any) => {
        errorSources.push({
            //path : "nickname iside lastname inside name"
            // path: issue.path.length > 1 && issue.path.reverse().join(" inside "),

            path: issue.path[issue.path.length - 1],
            message: issue.message
        })
    })

    return {
        statusCode: 400,
        message: "Zod Error",
        errorSources

    }
}