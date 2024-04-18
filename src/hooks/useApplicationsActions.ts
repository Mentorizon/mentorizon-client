import AuthStorage from '../services/AuthStorage';

const useApplicationActions = () => {
    const approveApplication = async (applicationId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStorage.getToken()}`,
                },
                body: JSON.stringify({ status: 'APPROVED' }),
            });
            return response.ok;
        } catch (error) {
            console.error('Error approving application:', error);
            return false;
        }
    };

    const denyApplication = async (applicationId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStorage.getToken()}`,
                },
                body: JSON.stringify({ status: 'DENIED' }),
            });
                return response.ok;
        } catch (error) {
            console.error('Error denying application:', error);
            return false;
        }
    };

    const deleteApplication = async (applicationId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/applications/${applicationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStorage.getToken()}`,
                },
            });
            return response.ok;
        } catch (error) {
            console.error('Error deleting application:', error);
            return false;
        }
    };

    return { approveApplication, denyApplication, deleteApplication };
};

export default useApplicationActions;
