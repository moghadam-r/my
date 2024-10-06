"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ثبت پاسخ</ModalHeader>
                            <ModalBody className="w-full flex  ">
                                <div className="space-y-2 mt-2 ">
                                   
                                    <div className="w-full flex  "  >
                                        <Textarea
                                            type="text"

                                            required
                                            isRequired
                                            label="درخواست"
                                            labelPlacement="outside"
                                            readOnly="true"
                                           // className="max-w-xs"
                                        // value={meliCode}
                                        //onValueChange={setMeliCode}
                                        />
                                    </div>
                                    <div className="w-full flex">
                                        <Textarea
                                            type="text"
                                            placeholder="پاسخ"
                                            required
                                            isRequired
                                            labelPlacement="outside"

                                           // className="max-w-xs"
                                        // value={meliCode}
                                        //onValueChange={setMeliCode}
                                        />
                                    </div>
                                    
                                </div>
                            </ModalBody>
                            <ModalFooter>

                                <Button color="primary" onPress={onClose}>
                                    ثبت
                                </Button>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    انصراف
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}