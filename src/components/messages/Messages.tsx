import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import {
  messagesApi,
  useGetMessagesQuery,
} from "../../features/messages/messagesApi";
import Error from "../ui/Error";
import Message from "./Message";

export default function Messages({ id }) {
  const { data, isLoading, isError, error } = useGetMessagesQuery(id) || {};
  const { data: messages, totalCount } = data || {};

  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const find = () => {
    console.log("hello");
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        messagesApi.endpoints.getMoreMessages.initiate({
          id,
          page,
        })
      );
    }
  }, [page, id, dispatch]);

  useEffect(() => {
    if (totalCount > 0) {
      const more =
        Math.ceil(
          totalCount / Number(process.env.REACT_APP_MESSAGES_PER_PAGE)
        ) > page;

      setHasMore(more);
    }
  }, [totalCount, page]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && messages?.length === 0) {
    content = <li className="m-2 text-center">No conversations found!</li>;
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={window.innerHeight - 300}
        inverse={true}
        style={{ display: "flex", flexDirection: "column-reverse" }}
      >
        {messages.map((singleMessage) => {
          const { sender, message, id } = singleMessage || {};
          const justify = sender.email !== email ? "start" : "end";

          return <Message key={id} justify={justify} message={message} />;
        })}
      </InfiniteScroll>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
      <ul className="space-y-2">{content}</ul>
    </div>
  );
}
