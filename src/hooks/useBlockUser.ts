import { toast } from 'react-toastify';

const useBlockUser = () => {
    const blockUser = async (userId: string, setUserList: React.Dispatch<React.SetStateAction<any[]>>) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/block`, { method: 'PUT' });
            if (response.ok) {
                toast.success('User blocked successfully.');
                setUserList(prevUsers => prevUsers.map(user => {
                    if (user.id === userId) {
                        return { ...user, isBlocked: true };
                    }
                    return user;
                }));
            } else {
                toast.error('Failed to block the user. Please try again.');
            }
        } catch (error) {
            console.error('Error blocking user:', error);
            toast.error('An error occurred while blocking the user. Please try again.');
        }
    };

    return blockUser;
};

export default useBlockUser;
