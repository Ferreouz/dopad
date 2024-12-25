import { useState } from 'react'
import './App.css'
import Image from './components/Image'
import CopyButton from './components/CopyButton';
import * as convert from './functions/convert';
import { v4 } from 'uuid';
import { Content, ContentType, isContentText, isContentImg } from './types';

const defaultContent: Content[] = [
  {
    key: "1",
    type: 'text',
    text: 'JJJJJJ'
  },
  {
    key: "2",
    type: 'image',
    url: '/1.jpg'
  },
  {
    key: "3",
    type: 'text',
    text: 'YYY'
  },
];
function App() {

  const [content, setContent] = useState<Content[]>(JSON.parse(JSON.stringify(defaultContent)));
  const [contentBD, setContentBD] = useState<Content[]>(defaultContent);

  function handleContentItemChange(id: string, newValue: string) {
    console.log(contentBD)
    setContentBD(c => c.map((item) => {
      if (item.key == id && isContentText(item)) {
        item.text = newValue;
      }
      return item;
    }))

  }
  function handleContentItemAdd(type: ContentType, newValue: string) {
    console.log(contentBD)
    const newContent: Content[] = [{ key: v4(), type, url: newValue } as Content, { key: v4(), type: 'text', text: " " }];
    setContentBD(c => [...c, ...newContent])
    setContent(c => [...c, ...newContent])

  }


  return (
    <>
      <div id='rootie'

        onPaste={(e) => {
          e.preventDefault();

          if (e.clipboardData.files && e.clipboardData.files.length > 0) {

            convert.retrieveImageFromClipboardAsBase64(e , function (imageDataBase64: string | undefined) {
              if (imageDataBase64) {
                handleContentItemAdd('image', imageDataBase64)
              }
            });
            return;
          }
          console.log(e.clipboardData.getData('Text'))
        }} >
        {
          content.map((item, index) => {
            if (isContentText(item)) {
              return <div
                id={index == content.length - 1 ? "lastChild" : ""}
                contentEditable={true} key={item.key}
                className="itemText"
                onInput={e => handleContentItemChange(item.key, e.currentTarget.innerText)}
              >{item.text}</div>
            }
            if (isContentImg(item)) {
              console.log(item)
              return <Image key={item.key} url={item.url as string} />
            }
          })
        }
      </div>
      <CopyButton type='text'
        content={contentBD.reduce((previous, current) => {
          if (isContentText(current)) {
            previous.text = previous.text + '\n' + current.text;
          }
          return previous;
        }, { text: "" } as Content).text || ""
        } />

    </>
  )

}

export default App