import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mantine/core";
import {
    useStoreDropdownValueMutation,
    useUpdateDropdownValueMutation,
} from "@/services/api/admin/dropdownApi";
import { notify, notifyError } from "@/utils/notify";
import { useForm } from "react-hook-form";

interface DropdownUpsertModalProps {
    opened: boolean;
    onClose: () => void;
    dropdown?: Dropdown;
    dropdown_value?: DropdownValue | null;
}

const DropdownValueUpsertModal: React.FC<DropdownUpsertModalProps> = ({
    opened,
    onClose,
    dropdown,
    dropdown_value,
}) => {
    const [storeDropdownValue] = useStoreDropdownValueMutation();
    const [updateDropdownValue] = useUpdateDropdownValueMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (dropdown_value) {
            reset({
                dropdown_id: dropdown_value?.dropdown_id,
                value: dropdown_value?.value,
            });
        } else {
            reset({
                dropdown_id: dropdown?.id,
                value: "",
            });
        }
    }, [dropdown_value, reset]);

    const submitHandler = async (data) => {
        try {
            let formData = new FormData();
            formData.append("value", data.value);
            if (dropdown_value) {
                formData.append("_method", "PUT");
                await updateDropdownValue({
                    dropdownValueId: data.dropdown_id,
                    data: formData,
                }).unwrap();
                notify("Dropdown Value updated successfully!");
            } else {
                await storeDropdownValue({
                    dropdownId: data.dropdown_id,
                    data: formData,
                }).unwrap();
                notify("Dropdown Value added successfully!");
            }
            onClose();
        } catch (err) {
            notifyError();
        }
    };

    return (
        <Modal
            zIndex={9999999999}
            centered
            opened={opened}
            onClose={onClose}
            title={
                dropdown_value
                    ? "Edit Dropdown Value"
                    : "Add New Dropdown Value"
            }
            overlayProps={{
                backgroundOpacity: 0.7,
                blur: 2,
            }}
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block mb-1 required-field">
                            Value
                        </label>
                        <input
                            type="text"
                            autoFocus
                            {...register("value", {
                                required: "Value is required",
                            })}
                            className="w-full p-2 border border-gray-300 rounded dark:bg-dark-gray-800 dark:border-strokedark"
                        ></input>
                        {errors.value?.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.value.message as string}
                            </p>
                        )}
                    </div>
                </div>
                <Button type="submit" mt="md">
                    {dropdown_value
                        ? "Update Dropdown Value"
                        : "Add Dropdown Value"}
                </Button>
            </form>
        </Modal>
    );
};

export default DropdownValueUpsertModal;
