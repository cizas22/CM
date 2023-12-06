import {Container, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import {useState} from "react";
import {Cancel, ExpandLess, ExpandMore} from "@mui/icons-material";
import {FormSchema, uniqueValidation} from "./validation.ts";
import {deleteById, findItemById, getUniqueNames, orderDown, orderUp} from "./utils.ts";

export interface CoachType {
    fullName: string;
    email: string
    couch?: string;
    id: string;
    members: CoachType[];
}

function App() {
    const [coaches, setCoach] = useState<CoachType>({
        "fullName": "1",
        "email": "",
        "id": "1",
        "members": [
            {
                "fullName": "2",
                "email": "",
                "couch": "1",
                "id": "2",
                "members": []
            },
            {
                "fullName": "3",
                "email": "",
                "couch": "1",
                "id": "3",
                "members": []
            },
            {
                "fullName": "4",
                "email": "",
                "couch": "1",
                "id": "4",
                "members": []
            }
        ]
    });

    const renderTree = (nodes: CoachType, index: number | null = null, last: boolean = false) => {
        return <li key={nodes.id}>
            {nodes.fullName}
            <div onClick={() => {
                if (!coaches)
                    return;
                deleteById(coaches, nodes.id);
                setCoach({...coaches});
            }}><Cancel/></div>
            {(index != null
                && index !== 0) && <div onClick={() => {
                if (!coaches)
                    return;
                orderUp(coaches, nodes.id);
                setCoach({...coaches});
            }}><ExpandLess/></div>}
            {(index != null && !last) && <div onClick={() => {
                if (!coaches)
                    return;
                orderDown(coaches, nodes.id);
                console.log(coaches);
                setCoach({...coaches});
            }}><ExpandMore/></div>}
            {Array.isArray(nodes.members)
                ? nodes.members.map((node, index) => <ul
                    key={node.id}>{renderTree(node, index, index + 1 === nodes.members.length)}</ul>)
                : null}
        </li>
    };


    return (
        <Container>
            <Typography variant="h4" align="center">
                Create - Form
            </Typography>
            <Formik
                enableReinitialize
                initialValues={{fullName: '', email: '', couch: 'root'}}
                onSubmit={(values, actions) => {
                    if (values.couch && values.couch !== 'root') {
                        const data = coaches;
                        if (!data) {
                            return;
                        }
                        const couch = findItemById(data, values.couch);
                        couch?.members?.push({...values, id: values.fullName.trim().toLowerCase(), members: []});
                        setCoach(data);
                    } else {
                        setCoach({...values, id: values.fullName.trim().toLowerCase(), members: []});
                    }
                    actions.resetForm();
                }}
                validationSchema={FormSchema}
            >
                {({values, handleChange, errors, touched, handleBlur}) => {
                    const isNameUnique = uniqueValidation(getUniqueNames(coaches), values.fullName);

                    return (
                        <Form>
                            <TextField
                                id="fullName"
                                name="fullName"
                                label="Full name"
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.fullName && Boolean(errors.fullName) || Boolean(isNameUnique)}
                                helperText={touched.fullName && errors.fullName || isNameUnique}
                            />
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <InputLabel id="couch">Couch</InputLabel>
                            <Select
                                fullWidth
                                labelId="couch"
                                id="couch"
                                name="couch"
                                value={values.couch}
                                label="Couch"
                                onChange={handleChange}
                            >
                                <MenuItem value="root"></MenuItem>
                                {coaches && getUniqueNames(coaches).map(c =>
                                    <MenuItem value={c} id={c} key={c}>{c}</MenuItem>)}
                            </Select>
                            <button type="submit">Submit</button>
                            <ul>{coaches && renderTree(coaches)}</ul>
                        </Form>
                    )
                }}
            </Formik>
        </Container>
    )
}

export default App;
