'use client'
import { apiRequest } from "@/lib/api/api-client"
import { deleteAllUsers } from "@/lib/hooks/useAuth"

export default function DeleteAllUsers () {
    const deleteUsers = deleteAllUsers()
    function handleDelete () {
        deleteUsers.mutate()
    }
    function deleteWorkspacebyId (id: string) {
            apiRequest(`/api/workspaces/${id}`, {
                method: 'DELETE'
            })
    }
    return (
        <>
        <button onClick={handleDelete}>
            Delete
        </button>
        <button onClick={() => deleteWorkspacebyId("b556d609-d819-49ca-84ef-e4f107a4abc5")}>
            Delete Workspaces
        </button>
        </>
    )
}

// fabf0ce4-3a7b-49ba-a0a1-1a8a3541182f