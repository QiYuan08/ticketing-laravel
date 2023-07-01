import React from "react";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import PaginationNumber from "./PaginationNumber";
import { router } from "@inertiajs/react";

const Pagination = ({ pagination, data, preserveState = false }) => {
    const changePage = (url) => {
        router.visit(url, {
            method: "get",
            data: data,
            preserveScroll: true,
            preserveState: preserveState,
        });
    };

    return (
        <div className="flex justify-end items-center gap-2">
            {pagination?.first_page_url && (
                <MdFirstPage
                    className="cursor-pointer"
                    size={20}
                    aria-disabled={!pagination.first_page_url}
                    onClick={() => changePage(pagination.first_page_url)}
                />
            )}
            {pagination?.prev_page_url && (
                <PaginationNumber
                    value={pagination.current_page - 1}
                    isActive={false}
                    onClick={() => changePage(pagination.prev_page_url)}
                />
            )}
            <PaginationNumber
                value={pagination?.current_page}
                isActive={true}
            />
            {pagination?.next_page_url && (
                <PaginationNumber
                    value={pagination.current_page + 1}
                    isActive={false}
                    onClick={() => changePage(pagination.next_page_url)}
                />
            )}
            {pagination?.last_page_url && (
                <MdLastPage
                    className="cursor-pointer"
                    size={20}
                    onClick={() => changePage(pagination.last_page_url)}
                />
            )}
        </div>
    );
};

export default Pagination;
