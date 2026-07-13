import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: () => void;
  onSettled?: () => void;
  throwError?: boolean;
};
export const useGetWorkspaces = () => {
  const data = useQuery(api.workspaces.get);
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};

export const useCreateWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);
  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: any, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");
        const response = await mutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        options?.onError?.();
        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");

        options?.onSettled?.();
      }
    },
    [mutation],
  );
  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isSettled,
    isError,
  };
};
