
type Props = {}

export default function SignOutButton({ }: Props) {
    return (
        <form action="/auth/signout" method="post">
            <button className="block button" type="submit">
                Sign out
            </button>
        </form>
    )
}