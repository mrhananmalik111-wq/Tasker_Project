import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const AddTask = ({ show, handleClose }) => {
    const [categories, setCategories] = useState([]);
    const [statuses, setStatus] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const getcategory = async () => {
        try {
            const res = await fetch("http://localhost:3300/api/v1/category/Get");
            if (!res.ok) {
                toast.error("Failed to fetch categories");
            }
            const data = await res.json();
            console.log("Categories:", data);
            setCategories(data);

        } catch (error) {
            console.error("Error fetching categories:", error.message);
        }
    }

    const getStatus = async () => {
        try {
            const res = await fetch("http://localhost:3300/api/v1/status/get");
            if (!res.ok) {
                toast.error("Failed to fetch Statuses");
            }
            const data = await res.json();
            console.log("Statuses:", data);
            setStatus(data);

        } catch (error) {
            console.error("Error fetching Statuses:", error.message);
        }
    }

    const onSubmit = async (formData) => {
        try {
            let url = "http://localhost:3300/api/v1/createCard";
            let method = "POST";

            // if (editTask) {
            //     url = `http://localhost:3300/api/v1/tasks/update/${editTask._id}`;
            //     method = "PUT";
            // }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            toast.success("Task created successfully 🎉");

            reset();
            handleClose();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Server Error 🚨");
        }
    };
    // useEffect(() => {
    //     if (editTask) {
    //         reset({
    //             Title: editTask.title,
    //             DueDate: editTask.duedate,
    //             DueTime: editTask.duetime,
    //             Description: editTask.description,
    //             Progress: editTask.progress,
    //             Status: editTask.status?._id || editTask.status,
    //             Category: editTask.category?._id || editTask.category,
    //         });

    //     } else {
    //         reset();
    //     }
    // }, [editTask, reset]);
    useEffect(() => {
        getcategory();
        getStatus();
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header
                style={{ color: "white" }}
                className="bg-primary"
                closeButton closeVariant="white"
            >
                <Modal.Title>Task Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Form.Group
                            style={{ width: "100%" }}
                            as={Col}
                            md="4"
                            controlId="validationCustom01"
                        >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                {...register("Title", { required: "Title is required" })}
                            />{errors.Title && <p style={{ color: "red" }}>{errors.Title.message}</p>}
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationCustom03">
                            <Form.Label style={{ width: "50%" }}>
                                Date <i className="fa-solid fa-calendar-week"></i>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Date"
                                {...register("DueDate", { required: "Date is required" })}
                            />
                            {errors.DueDate && <p style={{ color: "red" }}>{errors.DueDate.message}</p>}
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid date.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom04">
                            <Form.Label style={{ width: "50%" }}>Time</Form.Label>
                            <Form.Control
                                type="time"
                                {...register("DueTime", { required: "Time is required" })}
                            />
                            {errors.DueTime && <p style={{ color: "red" }}>{errors.DueTime.message}</p>}
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid time.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group
                        style={{ width: "100%" }}
                        as={Col}
                        md="4"
                        controlId="validationCustom05"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Add Description"
                            {...register("Description", { required: "Description is required" })}
                        />
                        {errors.Description && <p style={{ color: "red" }}>{errors.Description.message}</p>}
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3 mt-3">
                        <Form.Group as={Col} controlId="validationCustom06">
                            <Form.Label style={{ width: "50%" }}>Progress</Form.Label>
                            <Form.Select {...register("Progress", { required: "Progress is required" })}>
                                <option value="">Select progress</option>
                                <option value="0%">0%</option>
                                <option value="25%">25%</option>
                                <option value="50%">50%</option>
                                <option value="75%">75%</option>
                                <option value="100%">Completed</option>
                            </Form.Select>
                            {errors.Progress && <p style={{ color: "red" }}>{errors.Progress.message}</p>}

                            <Form.Control.Feedback type="invalid">
                                Please select a progress level.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom07">
                            <Form.Label style={{ width: "50%" }}>Status</Form.Label>
                            <Form.Select {...register("Status", { required: "Status is required" })}>
                                <option value="">Statuses</option>
                                {statuses && statuses.length > 0 ? (
                                    statuses.map((status) => (
                                        <option value={status._id} key={status._id}>
                                            {status.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        No Status exist
                                    </option>
                                )}
                            </Form.Select>
                            {errors.Status && <p style={{ color: "red" }}>{errors.Status.message}</p>}
                            <Form.Control.Feedback type="invalid">
                                Please select a status.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group as={Col} controlId="validationCustom07">
                        <Form.Label style={{ width: "50%" }}>Category</Form.Label>
                        <Form.Select {...register("Category", { required: "Category is required" })}>
                            <option value="">Category</option>
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    No category exist
                                </option>
                            )}
                        </Form.Select>
                        {errors.Category && <p style={{ color: "red" }}>{errors.Category.message}</p>}
                        <Form.Control.Feedback type="invalid">
                            Please select a Category.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddTask