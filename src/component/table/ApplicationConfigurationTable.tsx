import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {currentApplication, currentResources} from "../../store/selector/selector";
import {fillResourcesByApplicationId} from "../../store/thunk/mainLayoutThunk";
import {DataTable} from "primereact/datatable";
import {Application} from "../../type/Application";
import {Resource} from "../../type/Resource";
import {Column} from "primereact/column";
import {TableToolBar} from "../toolBar/TableToolBar";
import {AddResourceDialog} from "../tab/dialog/AddResourceDialog";


export const ApplicationConfigurationTable: React.FC<any> = () => {

    const selectedApplicationSelector: Application = useSelector(currentApplication)

    const currentResourcesSelector: Resource[] = useSelector(currentResources);

    const [selectedRow, setSelectedRow] = useState(null);

    const [visibleDialog, setVisibleDialog] = useState(false);


    const dispatcher = useDispatch<any>();

    useEffect(() => {
        if (selectedApplicationSelector.id) {
            dispatcher(fillResourcesByApplicationId({applicationId: selectedApplicationSelector.id}))
        }
    }, [dispatcher, selectedApplicationSelector.id])

    return <>
        <TableToolBar addAction={() => {
            setVisibleDialog(true)
        }}/>
        <AddResourceDialog visible={visibleDialog} setVisible={setVisibleDialog}/>
        <DataTable value={currentResourcesSelector}
                   id={"allResourcesForApplicationsDataTable"}
                   rows={10}
                   paginator
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   rowsPerPageOptions={[10, 25, 50]}
                   dataKey="resourceKey"
                   selection={selectedRow}
                   onSelectionChange={(e => setSelectedRow(e.value))}
                   sortField={"resourceKey"}
                   currentPageReportTemplate="Present {first} of {last} total {totalRecords}"
                   showGridlines
                   emptyMessage={`Resources for ${selectedApplicationSelector.name} is not found`}
        >
            <Column field={"resourceKey"} header={"resource key"}/>
            <Column field={"currentValue.value.data"} header={"current value"}/>
            <Column field={"currentValue.version.description"} header={"current version"}/>
        </DataTable>

    </>
}