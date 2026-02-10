import {
  Table,
  Avatar,
  Flex,
  Badge,
  Skeleton,
  Button,
  AlertDialog,
  Spinner,
} from "@radix-ui/themes";
import { CompEmptySmall } from "../../EmptyComp/CompEmpty";
import { Onload } from "@/app/util/Loader";
import Linked from "@/app/util/UtilsJester";

export const TableFill = ({
  TitleOne,
  TitleToo,
  TitleTri,
  TitleStat,
  LoadTagger,
  ItemData,
  onClick,
  SubTitleOne,
  SubTitleToo,
  SubTitleTri,
  SubTitleFor,
  EmptyImage,
  EmptyTitle,
}) => {
  return (
    <Table.Root>
      {ItemData.length > 0 ? (
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="text-gray-500">
              {TitleOne}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-gray-500">
              {TitleToo}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-gray-500">
              {TitleTri}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-gray-500">
              {TitleStat}
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
      ) : null}

      <Table.Body className="border-b text-gray-50">
        {LoadTagger ? (
          <Onload Arraay={4} />
        ) : (
          <>
            {ItemData.length > 0 ? (
              <>
                {ItemData.map((item) => (
                  <Table.Row
                    className="border-b border-gray-50 cursor-pointer"
                    key={item.id}
                    onClick={() => onClick(item)}
                  >
                    <Table.RowHeaderCell className="text-gray-700">
                      {SubTitleOne(item)}
                    </Table.RowHeaderCell>
                    <Table.Cell className="text-gray-700">
                      {SubTitleToo(item)}
                    </Table.Cell>
                    <Table.Cell className="text-gray-700">
                      {SubTitleTri(item)}
                    </Table.Cell>
                    <Table.Cell className="text-gray-700">
                      {SubTitleFor(item)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            ) : (
              <Table.Row className="text-center text-white">
                <Table.Cell
                  colSpan={4}
                  className="shadow border-none border-b-white"
                >
                  <CompEmptySmall SmallTitle={EmptyTitle} src={EmptyImage} />
                </Table.Cell>
              </Table.Row>
            )}
          </>
        )}
      </Table.Body>
    </Table.Root>
  );
};

export const TableFillII = ({
  TitleOne,
  TitleToo,
  TitleTri,
  TitleStat,
  LoadTagger,
  ItemData,
  onClick,
  SubTitleOne,
  SubTitleToo,
  SubTitleTri,
  SubTitleFor,
  EmptyImage,
  EmptyTitle,
  SubTitleFiv,
  TitleFiv,
  TitleSix,
  SubTitleSix,
  LoadNos,
  Variant,
}) => {
  return (
    <Table.Root size="2" variant={Variant ? Variant : "surface"}>
      {ItemData.length > 0 ? (
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="text-gray-500 flex-shrink-0 whitespace-nowrap">
              {TitleOne}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-gray-500 flex-shrink-0 whitespace-nowrap">
              {TitleToo}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-gray-500 flex-shrink-0 whitespace-nowrap">
              {TitleTri}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-gray-500 flex-shrink-0 whitespace-nowrap">
              {TitleStat}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="text-gray-500 flex-shrink-0 whitespace-nowrap">
              {TitleFiv}
            </Table.ColumnHeaderCell>
            {TitleSix ? (
              <Table.ColumnHeaderCell className="text-gray-500 flex-shrink-0 whitespace-nowrap">
                {TitleSix}
              </Table.ColumnHeaderCell>
            ) : null}
          </Table.Row>
        </Table.Header>
      ) : null}

      <Table.Body className="border-b text-gray-50">
        {LoadTagger ? (
          <Onload Arraay={LoadNos ? LoadNos : 5} />
        ) : (
          <>
            {ItemData.length > 0 ? (
              <>
                {ItemData.map((item) => (
                  <Table.Row
                    className="border-b border-gray-50 cursor-pointer"
                    key={item.id}
                    //onClick={() => onClick(item)}
                    variant="surface"
                  >
                    <Table.RowHeaderCell className="text-gray-700 whitespace-nowrap">
                      {SubTitleOne(item)}
                    </Table.RowHeaderCell>
                    <Table.Cell className="text-gray-700 whitespace-nowrap items-center">
                      {SubTitleToo(item)}
                    </Table.Cell>
                    <Table.Cell className="text-gray-700 whitespace-nowrap items-center">
                      {SubTitleTri(item)}
                    </Table.Cell>
                    <Table.Cell className="text-gray-700 flex-shrink-0 whitespace-nowrap items-center">
                      {SubTitleFor(item)}
                    </Table.Cell>
                    <Table.Cell className="text-gray-700 flex-shrink-0 whitespace-nowrap items-center">
                      {SubTitleFiv(item)}
                    </Table.Cell>
                    {TitleSix ? (
                      <Table.Cell className="text-gray-700 flex-shrink-0 whitespace-nowrap items-center">
                        {SubTitleSix(item)}
                      </Table.Cell>
                    ) : null}
                  </Table.Row>
                ))}
              </>
            ) : (
              <Table.Row className="text-center text-white">
                <Table.Cell
                  colSpan={LoadNos ? LoadNos : 5}
                  className="shadow border-none border-b-white"
                >
                  <CompEmptySmall SmallTitle={EmptyTitle} src={EmptyImage} />
                </Table.Cell>
              </Table.Row>
            )}
          </>
        )}
      </Table.Body>
    </Table.Root>
  );
};

export const TableBoxVcard = ({
  TopBarHold,
  Title,
  SmallText,
  linkText,
  link,
  Trunt,
}) => {
  return (
    <div className="bg-white p-4 rounded-md mb-5 md:mb-0 md:flex-1 md:mr-1 md:ml-1">
      {Trunt ? (
        <div className="flex justify-between items-center w-full mb-3">
          <div className="md:flex-1">
            <h2 className="text-sm font-semibold mb-1 text-gray-600">
              {Title}
            </h2>
            <p className="text-xs text-gray-500 mb-1">{SmallText}</p>
          </div>
          {link || linkText ? (
            <div className="md:flex-1 text-xs text-right">
              <Linked
                Title={linkText}
                linkref={link}
                restyle={"text-gray-600 text-xs hover:text-red-500 text-right"}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="overflow-auto hide-scrollbar">{TopBarHold}</div>
    </div>
  );
};

export const DashboardChartClub = ({
  title,
  amount,
  moreStyle,
  IconStod,
  titleSmall,
  Viewer,
}) => {
  return (
    <div
      className={`${moreStyle} border border-gray-300 bg-white p-4 rounded-lg`}
    >
      <div className={"mb-4 md:flex md:gap-3"}>
        {IconStod}
        <div>
          <p className="md:text-sm text-xs font-semibold text-gray-700">
            {title}
          </p>
          <p className="text-xs text-gray-500">{titleSmall}</p>
        </div>
      </div>
      <h3 className="text-sm md:text-base mt-2 md:text-right font-semibold text-gray-800">
        {amount}
      </h3>
    </div>
  );
};

export const TablePage = ({ Title, SmallText, TableShit, SwitchDrop }) => {
  return (
    <div className="bg-white p-4 rounded-md md:flex-1 flex-1 md:mr-1 md:ml-1 mb-4 pb-14">
      {Title ? (
        <div className="flex justify-between items-center w-full mb-5">
          <div className="md:flex-1">
            <h2 className="text-md font-semibold mb-1 text-gray-600">
              {Title}
            </h2>
            <p className="text-xs text-gray-500 mb-1">{SmallText}</p>
          </div>
          {SwitchDrop}
        </div>
      ) : null}

      <div className="overflow-auto max-h-screen">{TableShit}</div>
    </div>
  );
};

export const TablePageIII = ({ Title, SmallText, TableShit, SwitchDrop }) => {
  return (
    <div className="bg-white p-4 rounded-md md:flex-1 flex-1 md:mr-1 md:ml-1 mb-4 pb-6 max-h-[85vh] flex flex-col">
      {Title ? (
        <div className="flex justify-between items-center w-full mb-5 flex-shrink-0">
          <div className="md:flex-1">
            <h2 className="text-md font-semibold mb-1 text-gray-600">
              {Title}
            </h2>
            <p className="text-xs text-gray-500 mb-1">{SmallText}</p>
          </div>
          {SwitchDrop}
        </div>
      ) : null}

      {/* Table wrapper */}
      <div className="overflow-auto flex-1">{TableShit}</div>
    </div>
  );
};
