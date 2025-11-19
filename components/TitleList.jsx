// Title list component to list all the titles of images

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

// modal component import to show description and img of selected title

import DetailsModal from "./DetailsModal";

const TitleList = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const detailsClickHandler = (details) => {
    setIsOpen(true);
    setItemDetails(details);
  };
  return (
    <>
      <div className="md:flex flex-wrap gap-5 justify-between mt-2 mx-2">
        {items.map((ele) => {
          return (
            <Item
              variant={"outline"}
              key={ele.id}
              className="py-2 md:w-[22%] bg-gray-200 mt-2 md:mt-0"
            >
              <ItemContent>
                <ItemTitle className="font-semibold ">{ele?.title}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => detailsClickHandler(ele)}
                >
                  Details
                </Button>
              </ItemActions>
            </Item>
          );
        })}
      </div>
      {isOpen && (
        <DetailsModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          itemDetails={itemDetails}
        />
      )}
    </>
  );
};

export default TitleList;
