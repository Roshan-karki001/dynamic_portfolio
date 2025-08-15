import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa'
import handleServerError from '@/utils/handleServerError'
import {
    useGetUserSettingQuery,
    useUpdatePasswordMutation,
    useUpdatePersonalInformationMutation,
    useUpdateProfilePictureMutation,
    useUpdateSocialLinkMutation,
} from '@/services/api/admin/userSettingApi'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { notify, notifyError } from '@/utils/notify'
import '@mantine/dropzone/styles.css'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { Group, SimpleGrid, Text, rem } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import DefaultUserImage from '@/../../public/images/default-user-image.png'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationDot, FaMartiniGlass, FaWhatsapp } from 'react-icons/fa6'

const Settings = () => {
    const navigate = useNavigate()
    const { data: userSetting, isLoading, isError } = useGetUserSettingQuery()
    const [updatePersonalInformation, { isLoading: isUpdatingPersonalInformation }] =
        useUpdatePersonalInformationMutation()
    const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation()
    const [updateProfilePicture, { isLoading: isUpdatingProfilePicture }] = useUpdateProfilePictureMutation()
    const [updateSocialLink, { isLoading: isUpdatingSocialLink }] = useUpdateSocialLinkMutation()
    const [files, setFiles] = useState<FileWithPath[]>([])

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file)
        return <img key={index} src={imageUrl} className="max-h-12" onLoad={() => URL.revokeObjectURL(imageUrl)} />
    })

    const {
        register: registerPersonalInformation,
        handleSubmit: submitPersonalInformation,
        reset: resetPersonalInformation,
        setError: setPersonalInformationError,
        formState: { errors: personalInformationErrors },
    } = useForm()

    const {
        register: registerPassword,
        handleSubmit: submitPassword,
        reset: resetPassword,
        setError: setPasswordError,
        formState: { errors: passwordErrors },
    } = useForm()

    const {
        register: registerProfilePicture,
        handleSubmit: submitProfilePicture,
        reset: resetProfilePicture,
        setError: setProfilePictureError,
        formState: { errors: profilePictureErrors },
    } = useForm()

    const {
        register: registerSocialLink,
        handleSubmit: submitSocialLink,
        reset: resetSocialLink,
        setError: setSocialError,
        formState: { errors: socialLinkErrors },
    } = useForm()

    useEffect(() => {
        if (userSetting) {
            resetPersonalInformation({
                name: userSetting.name,
                email: userSetting.email,
                contact_number: userSetting.contact_number,
                address: userSetting.address,
                bio: userSetting.bio,
            })

            resetPassword({
                current_password: '',
                new_password: '',
                new_password_confirmation: '',
            })

            resetProfilePicture({
                profile_picture: '',
            })

            resetSocialLink({
                facebook: userSetting.social_links?.facebook,
                instagram: userSetting.social_links?.instagram,
                whatsapp: userSetting.social_links?.whatsapp,
                linkedin: userSetting.social_links?.linkedin,
            })
        }
    }, [userSetting, resetPersonalInformation, resetPassword, resetProfilePicture, resetSocialLink])

    const submitPersonalInformationHandler = async (data) => {
        try {
            await updatePersonalInformation(data).unwrap()
            notify('Updated Personal Information successfully!')
        } catch (err) {
            handleServerError(err, setPersonalInformationError)
        }
    }

    const submitPasswordHandler = async (data) => {
        try {
            await updatePassword(data).unwrap()
            notify('Updated Password successfully!')
        } catch (err) {
            handleServerError(err, setPasswordError)
        }
    }

    const submitProfilePictureHandler = async (data) => {
        try {
            let formData = new FormData()
            formData.append('profile_picture', data.profile_picture)
            await updateProfilePicture(formData).unwrap()
            notify('Updated Profile Picture successfully!')
            setFiles([])
        } catch (err) {
            handleServerError(err, setProfilePictureError)
        }
    }

    const submitSocialLinkHandler = async (data) => {
        try {
            await updateSocialLink(data).unwrap()
            notify('Updated Social Links successfully!')
        } catch (err) {
            handleServerError(err, setSocialError)
        }
    }

    return (
        <>
            <div className="mx-auto max-w-270">
                <Breadcrumb basePageName="Dashboard" basePageLink="/admin/dashboard" pageName="Settings" />
                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={submitPersonalInformation(submitPersonalInformationHandler)}>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white required-field"
                                                htmlFor="name"
                                            >
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FaUser />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    {...registerPersonalInformation('name', {
                                                        required: 'Full Name is required',
                                                    })}
                                                    id="name"
                                                    placeholder="Devid Jhon"
                                                />
                                                {personalInformationErrors.name?.message && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {personalInformationErrors.name.message as string}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="contact_number"
                                            >
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FaPhone />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    {...registerPersonalInformation('contact_number')}
                                                    id="contact_number"
                                                    placeholder="+990 3343 7865"
                                                />
                                                {personalInformationErrors.contact_number?.message && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {personalInformationErrors.contact_number.message as string}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="email"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaEnvelope />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="email"
                                                {...registerPersonalInformation('email')}
                                                id="email"
                                                placeholder="devidjond45@gmail.com"
                                            />
                                            {personalInformationErrors.email?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {personalInformationErrors.email.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="address"
                                        >
                                            Address
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaLocationDot />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                {...registerPersonalInformation('address')}
                                                id="address"
                                                placeholder="New York, USA"
                                            />
                                            {personalInformationErrors.address?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {personalInformationErrors.address.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="bio"
                                        >
                                            Bio
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaMartiniGlass />
                                            </span>
                                            <textarea
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                {...registerPersonalInformation('bio')}
                                                rows={4}
                                                id="bio"
                                            />
                                            {personalInformationErrors.bio?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {personalInformationErrors.bio.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-4">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Update your Password</h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={submitPassword(submitPasswordHandler)}>
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white required-field"
                                            htmlFor="current_password"
                                        >
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaLock />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="password"
                                                {...registerPassword('current_password', {
                                                    required: 'Current Password is required',
                                                })}
                                                id="current_password"
                                                placeholder="Enter your current password"
                                            />
                                            {passwordErrors.current_password?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {passwordErrors.current_password.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white required-field"
                                            htmlFor="new_password"
                                        >
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaLock />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="password"
                                                {...registerPassword('new_password', {
                                                    required: 'New Password is required',
                                                })}
                                                id="new_password"
                                                placeholder="Enter your new password"
                                            />
                                            {passwordErrors.new_password?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {passwordErrors.new_password.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white required-field"
                                            htmlFor="new_password_confirmation"
                                        >
                                            New Password Confirmation
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaLock />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="password"
                                                {...registerPassword('new_password_confirmation', {
                                                    required: 'New Password Confirmation is required',
                                                })}
                                                id="new_password_confirmation"
                                                placeholder="Enter your new password"
                                            />
                                            {passwordErrors.new_password_confirmation?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {passwordErrors.new_password_confirmation.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 xl:col-span-2">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={submitProfilePicture(submitProfilePictureHandler)}>
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-14 w-14 rounded-full overflow-hidden">
                                            <img
                                                className="h-full w-full rounded-full object-cover"
                                                src={userSetting?.profile_picture_url || DefaultUserImage}
                                                alt="User"
                                            />
                                        </div>
                                        <div>
                                            <span className="mb-1.5 text-black dark:text-white required-field">
                                                Profile Picture
                                            </span>
                                        </div>
                                    </div>

                                    <Dropzone
                                        onDrop={(files) => {
                                            setFiles(files)
                                            resetProfilePicture({
                                                profile_picture: files[0],
                                            })
                                        }}
                                        onReject={(error) => {
                                            let errorMessage = error?.[0]?.errors?.[0]?.message
                                            if (errorMessage && typeof errorMessage == 'string') {
                                                notifyError(errorMessage)
                                            }
                                        }}
                                        accept={IMAGE_MIME_TYPE}
                                        maxFiles={1}
                                        multiple={false}
                                        {...registerProfilePicture('profile_picture', {
                                            required: 'Profile Picture is required',
                                        })}
                                    >
                                        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                                            <Dropzone.Accept>
                                                <IconUpload
                                                    style={{
                                                        width: rem(52),
                                                        height: rem(52),
                                                        color: 'var(--mantine-color-blue-6)',
                                                    }}
                                                    stroke={1.5}
                                                />
                                            </Dropzone.Accept>
                                            <Dropzone.Reject>
                                                <IconX
                                                    style={{
                                                        width: rem(52),
                                                        height: rem(52),
                                                        color: 'var(--mantine-color-red-6)',
                                                    }}
                                                    stroke={1.5}
                                                />
                                            </Dropzone.Reject>
                                            <Dropzone.Idle>
                                                <IconPhoto
                                                    style={{
                                                        width: rem(52),
                                                        height: rem(52),
                                                        color: 'var(--mantine-color-dimmed)',
                                                    }}
                                                    stroke={1.5}
                                                />
                                            </Dropzone.Idle>

                                            <div>
                                                <Text size="xl" style={{ textAlign: 'center' }} inline>
                                                    Drag image here or click to select file
                                                </Text>
                                                <Text
                                                    size="sm"
                                                    style={{ textAlign: 'center' }}
                                                    c="dimmed"
                                                    inline
                                                    mt={7}
                                                >
                                                    file should not exceed 5mb
                                                </Text>
                                                <Text
                                                    size="sm"
                                                    style={{ textAlign: 'center' }}
                                                    c="dimmed"
                                                    inline
                                                    mt={7}
                                                >
                                                    SVG, PNG, JPG or GIF
                                                </Text>
                                            </div>
                                        </Group>
                                    </Dropzone>
                                    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                                        {previews}
                                    </SimpleGrid>

                                    {profilePictureErrors.profile_picture?.message && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {profilePictureErrors.profile_picture.message as string}
                                        </p>
                                    )}

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-4">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Social Media Links</h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={submitSocialLink(submitSocialLinkHandler)}>
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="facebook"
                                        >
                                            Facebook
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaFacebook />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                {...registerSocialLink('facebook')}
                                                id="facebook"
                                                placeholder="Enter Facebook link"
                                            />
                                            {socialLinkErrors.facebook?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {socialLinkErrors.facebook.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="instagram"
                                        >
                                            Instagram
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaInstagram />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                {...registerSocialLink('instagram')}
                                                id="instagram"
                                                placeholder="Enter Instagram link"
                                            />
                                            {socialLinkErrors.instagram?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {socialLinkErrors.instagram.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="whatsapp"
                                        >
                                            Whatsapp
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaWhatsapp />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                {...registerSocialLink('whatsapp')}
                                                id="whatsapp"
                                                placeholder="Enter Whatsapp link"
                                            />
                                            {socialLinkErrors.whatsapp?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {socialLinkErrors.whatsapp.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="linkedin"
                                        >
                                            LinkedIn
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FaLinkedin />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                {...registerSocialLink('linkedin')}
                                                id="linkedin"
                                                placeholder="Enter LinkedIn link"
                                            />
                                            {socialLinkErrors.linkedin?.message && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {socialLinkErrors.linkedin.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings
