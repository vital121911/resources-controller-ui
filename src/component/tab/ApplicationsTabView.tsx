import React, {useState} from "react";
import {TabPanel, TabView} from "primereact/tabview";
import {Card} from "primereact/card";
import {useSelector} from "react-redux";
import {currentApplication} from "../../store/selector/selector";
import {ApplicationConfigurationTable} from "../table/ApplicationConfigurationTable";


export const ApplicationsTabView: React.FC<any> = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const currentApplicationSelector = useSelector(currentApplication);

    return <>
        <Card>
            <TabView activeIndex={activeIndex}
                     onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header={"Configurations & resources"}>
                    <Card title={currentApplicationSelector.name} className={"text-center"}>
                        <ApplicationConfigurationTable/>
                    </Card>
                </TabPanel>
            </TabView>
        </Card>
    </>
}