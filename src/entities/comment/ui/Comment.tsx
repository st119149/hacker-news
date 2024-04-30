import { Caption, Div, Footnote, Link, Spinner } from "@vkontakte/vkui";
import { FC, useMemo, useState } from "react";
// @ts-expect-error
import ReactHtmlParser from "react-html-parser";
import { useComment } from "../models/useComment";

interface CommentProps {
  id: number;
}

export const Comment: FC<CommentProps> = ({ id }) => {
  const [comment, isLoading] = useComment(id);

  const [isOpen, setIsOpen] = useState(false);

  const time = useMemo(
    () => comment && new Date(comment.time * 1000).toDateString(),
    [comment]
  );

  if (isLoading) return <Spinner />;

  return (
    <Div>
      <Caption level="1">{comment?.by}</Caption>
      <div>{ReactHtmlParser(comment?.text)}</div>
      <Footnote caps>{time}</Footnote>
      {isOpen && comment?.kids?.map((id) => <Comment id={id} key={id} />)}
      {comment?.kids?.length && !isOpen && (
        <Link onClick={() => setIsOpen(true)}>
          {comment?.kids?.length} answers
        </Link>
      )}
    </Div>
  );
};
