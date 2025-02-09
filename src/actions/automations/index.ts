"use server"



import { onCurrentUser } from "../user"
import { createAutomation , findAutomation, getAutomations, updateAutomation} from "./queries"

export const createAutomations = async (id?: string) => {
    const user = await onCurrentUser()
    try {
        const create = await createAutomation(user.id, id)
        if(create) return {status: 200, data: 'Automation created'}
        return {status: 400, data: 'Automation not created'}
    } catch (error) {
        return {status: 500, data: 'Internal Server Error'}
    }
}

export const getAllAutomations = async () => {
    const user = await onCurrentUser()
    try{
        const automations = await getAutomations(user.id)
        if(automations) return {status: 200, data: automations.automations}
        return {status: 400, data: []}
    }
    catch(ettor){
        return {status: 500, data: []}
    }
        
}

export const getAutomationInfo = async(id: string) => {
    await onCurrentUser()
    try{
        const automation = await findAutomation(id)
        if(automation) return {status: 200, data: automation}
        return {status: 400}
    }
    catch (error){
        return {status: 500}
    }
}


export const updateAutomationName = async (
    automationId: string,
    data: {
        name?: string
        active?: boolean
        automation?: string
    }
) => {
    await onCurrentUser()
    try{
        const update = await updateAutomation(automationId, data)
        if(update) {
            return { status: 200, data: 'Automation successfully updated'}
        }
        return {status: 400 , data: 'Oops! could not find automation'}
    }catch (error) {
        return {status: 500, data: 'Oops! Something went wrong'}
    }
}