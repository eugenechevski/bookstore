import TextButton from "components/general/TextButton";
import IconButton from "components/general/IconButton";
import { useEffect, useState } from "react";
import ImageComponent from "components/general/ImageComponent";

const BookDescription = ({ book }: { book: IBook | {} }) => {
  const [coverUrl, setCoverUrl] = useState("");
  const [bookTitle, setTitle] = useState("");
  const [bookAuthor, setAuthor] = useState("");
  const [bookSynopsis, setSynopsis] = useState("");

  // Load the book data
  useEffect(() => {
    if (Object.keys(book).length > 0) {
      setCoverUrl((book as IBook).getCoverUrl());
      setTitle((book as IBook).getTitle());
      setAuthor((book as IBook).getAuthorName());
      setSynopsis((book as IBook).getSynopsis());
    }
  }, [book]);

  const textButtonClasses =
    "btn-accent " +
    "btn-sm " +
    "rounded-full " +
    "shadow-lg " +
    "text-xs " +
    "w-1/2 " +
    "hover:bg-accent-focus";
  const iconButtonCLasses = "text-secondary-content ";

  return (
    <div
      className="h-1/2
                 w-3/4
                 sm:h-5/6 
                 sm:w-2/3
                 flex
                 flex-col
                 justify-center
                 items-center
                 sm:gap-16 
                 sm:flex-row"
    >
      {/* Bookcover and buttons */}
      <div
        className="h-1/2
                   flex 
                   flex-col 
                   gap-3"
      >
        {/* Bookcover */}
        <ImageComponent
          src={coverUrl}
          alt={bookTitle + " cover"}
          classes="shadow-2xl
                   drop-shadow-2xl
                   w-32
                   h-48
                   sm:w-64
                   sm:h-96"
        />
        {/* Buttons */}
        <div
          data-testid="add-buttons"
          className="flex
                     flex-row 
                     items-center 
                     justify-center 
                     gap-3 
                     sm:flex-col"
        >
          {window.screen.width > 640 ? (
            <>
              <TextButton
                onClickListener={() => null}
                textContent={"Add to Cart"}
                classes={textButtonClasses}
              ></TextButton>
              <TextButton
                onClickListener={() => null}
                textContent={"Add to Wishlist"}
                classes={textButtonClasses}
              ></TextButton>
            </>
          ) : (
            <>
              <IconButton
                onClickListener={() => null}
                classes={iconButtonCLasses}
                iconName={"cart"}
              ></IconButton>
              <IconButton
                onClickListener={() => null}
                classes={iconButtonCLasses}
                iconName={"heart"}
              ></IconButton>
            </>
          )}
        </div>
      </div>
      {/* Title, author, and synopsis */}
      <div
        className="h-1/2
                   flex
                   flex-col
                   gap-3"
      >
        {/* Title */}
        <div
          data-testid="title"
          className="text-xl
                     sm:text-5xl 
                     font-bold 
                     w-full 
                     text-shadow-lg 
                     drop-shadow-lg 
                     text-center 
                     overflow-hidden
                     sm:text-start"
        >
          {bookTitle}
        </div>
        {/* Author */}
        <div
          data-testid="author"
          className="text-center 
                     text-xl 
                     w-full
                     text-shadow-lg-
                     drop-shadow-lg 
                     overflow-hidden
                     sm:text-start"
        >
          {bookAuthor}
        </div>
        {/* Synopsis */}
        <div
          data-testid="synopsis"
          className="text-sm
                     sm:text-lg
                     text-justify
                     whitespace-normal
                     text-shadow-lg
                     drop-shadow-lg
                     overflow-hidden"
        >
          {bookSynopsis}
        </div>
      </div>
    </div>
  );
};

export default BookDescription;
