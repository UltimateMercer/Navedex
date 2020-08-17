export default function ({ store, redirect }) {
  if (!store.state.authToken) {
    return redirect("/");
  }
}
