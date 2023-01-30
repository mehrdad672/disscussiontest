import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DiscussionProvider } from "@/Components/discussionContext";
import { store } from '../Components/store';
import { Provider } from "react-redux";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
