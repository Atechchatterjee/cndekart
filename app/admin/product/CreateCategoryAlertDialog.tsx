"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { MdCategory } from "react-icons/md";
import autoAnimate from "@formkit/auto-animate";
import { CategoryTree, Node, ROOT } from "./CategoryTree";

export default function CreateCategoryAlertDialog() {
  const form = useForm<{ category: string }>({
    defaultValues: { category: "" },
  });
  const [open, setOpen] = useState<boolean>(false);
  const animationParent = useRef(null);
  const { data: categories, isLoading } = trpc.fetchCategories.useQuery(
    {},
    { enabled: open }
  );
  const createSubCategoriesMutation = trpc.createSubCategories.useMutation();
  const [categoryTree, setCategoryTree] = useState<CategoryTree>();
  const [categoryStack, setCategoryStack] = useState<Node[]>();
  const [createCategoryLoading, setCreateCategoryLoading] =
    useState<boolean>(false);

  function createCategoryTree() {
    const categoryTree = new CategoryTree();
    categories?.forEach((category) => {
      categoryTree.add(
        { id: category.id, category: category.category },
        category.parentId
      );
    });
    return categoryTree;
  }

  function peekCategoryStack() {
    if (categoryStack) return categoryStack[categoryStack.length - 1];
    else return new Node(ROOT);
  }

  useEffect(() => {
    const categoryTree = createCategoryTree();
    setCategoryTree(categoryTree);
    setCategoryStack([categoryTree.root]);
  }, [categories]);

  useEffect(() => {
    if (animationParent.current) autoAnimate(animationParent.current);
  }, [open]);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex gap-3 self-end"
          onClick={() => setOpen(!open)}
        >
          <MdCategory size={17} />
          Category
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Category</AlertDialogTitle>
          <AlertDialogDescription>
            Fill This form to create categories for products.
          </AlertDialogDescription>
          <div
            ref={animationParent}
            className="flex flex-col gap-2 w-full pt-5 "
          >
            <h3 className="text-[1.1rem] font-semibold">
              {peekCategoryStack().category?.category}
            </h3>
            {isLoading && (
              <LoadingSpinner className="self-center ml-auto mr-auto" />
            )}
            {!isLoading && peekCategoryStack().children.length === 0 && (
              <div className="text-slate-500 text-sm">No Sub Categories</div>
            )}
            {peekCategoryStack().children?.map((category, i) => (
              <div
                className="flex flex-1 border border-slate-200 rounded-lg p-3 text-sm hover:text-primary hover:border-primary hover:font-medium transition-colors duration-200"
                key={i}
                onClick={() => {
                  if (categoryStack)
                    setCategoryStack([...categoryStack, category]);
                }}
              >
                {category.category.category}
              </div>
            ))}
          </div>
          {peekCategoryStack().category?.category !== "root" && (
            <div className="flex gap-3 self-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setCategoryStack((currentCategoryStack) =>
                    currentCategoryStack?.slice(0, -1)
                  );
                }}
              >
                Back
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  if (categoryTree) setCategoryStack([categoryTree.root]);
                }}
              >
                Back to Root
              </Button>
            </div>
          )}
          <FormProvider {...form}>
            <form className="pt-5 pb-5">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Create Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end mt-8">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    const formValues = form.getValues();
                    setCreateCategoryLoading(true);
                    // adding sub categories
                    createSubCategoriesMutation.mutate(
                      {
                        currentCategoryName: formValues.category,
                        parentCategoryId: peekCategoryStack().category.id,
                      },
                      {
                        onSuccess: (newCategory) => {
                          form.reset();
                          const categoryTreeLocal = categoryTree;
                          if (categoryTreeLocal) {
                            categoryTreeLocal.add(
                              {
                                id: newCategory.id,
                                category: newCategory.category,
                              },
                              newCategory.parentId
                            );
                            setCategoryTree(categoryTreeLocal);
                          }
                          setCreateCategoryLoading(false);
                        },
                      }
                    );
                    e.preventDefault();
                  }}
                >
                  {createCategoryLoading ? <LoadingSpinner /> : "Create"}
                </Button>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                  Cancel
                </AlertDialogCancel>
              </div>
            </form>
          </FormProvider>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
