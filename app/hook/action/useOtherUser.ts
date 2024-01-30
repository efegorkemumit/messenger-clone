import { FullConversationType } from "@/app/type";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation: FullConversationType | {
    users: User[]
}) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUseremail = session.data?.user?.email;
        const otherUser = conversation.users.filter((user) =>
            user.email !== currentUseremail
        );
        return otherUser[0];
    }, [session.data?.user?.email, conversation.users]);

    return otherUser;
}

export default useOtherUser;
