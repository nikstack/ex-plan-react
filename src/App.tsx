import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import './App.css';

interface ItemType {
    id: number;
    name: string;
}

export default function App() {

    const [list1, setList1] = useState<ItemType[]>([
        { id: 1, name: "HM" },
        { id: 2, name: "BWL 1" },
        { id: 3, name: "BWL 2" },
        { id: 4, name: "DBS" },
        { id: 5, name: "ProSeminar" },
    ]);


    const [list2, setList2] = useState<ItemType[]>([
        { id: 6, name: "Numerik" },
        { id: 7, name: "MMI" },
        { id: 8, name: "WT" },
        { id: 9, name: "Rest" },
    ]);

    return (
        <main>
            <div className="column">
                <ReactSortable list={list1} setList={setList1} group="shared-group-name">
                    {list1.map((item) => (
                        <div className="listItem" key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable>

            </div>
            <div className="column">
                <ReactSortable list={list2} setList={setList2} group="shared-group-name">
                    {list2.map((item) => (
                        <div className="listItem" key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable>
            </div>
        </main>
    );
};
