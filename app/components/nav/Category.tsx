'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category = ({ label, icon: Icon, selected }: CategoryProps) => {
  const router = useRouter();
  
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [label, router, params]);

  return (
    <div onClick={handleClick}
      className={`
    flex items-center gap-1 p-2 border-b-2 hover: text-slate-800 transition cursor-pointer
    ${
      selected
        ? "border-b-slate-800 text-slate-800"
        : "border-transparent text-slate-500"
    }
    `}
    >
      <Icon size={20} className="hidden md:block"/>
      <div className="font-medium text-xs md:text-sm">{label}</div>
    </div>
  );
};

export default Category;
