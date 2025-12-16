import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MdAdd } from 'react-icons/md';
import { useIntl } from 'react-intl';

import NoImageSVG from '@/assets/no-image.png';
import { UploadFileObject } from '@/shared/types/form.types';
import { normalizeString, toBase64 } from '@/shared/utils/form.utils';
import { cn } from '@/shared/utils/style.utils';

import { Button } from '../button';
import { Icon } from '../icon';
import { Text } from '../text';

import './image-input.scss';

export type ImageInputProps = {
  name: string;
  label?: string;
  value?: string | UploadFileObject;
  invalid?: boolean; // !TODO
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
  style?: React.CSSProperties;
  allowedExtensions?: string[];
  onChange: (value: UploadFileObject | null) => void;
};

function ImageInput({
  name,
  label,
  value,
  disabled,
  required,
  errorMessage,
  className,
  style,
  allowedExtensions,
  onChange,
}: ImageInputProps) {
  const { formatMessage } = useIntl();
  const inputElement: any = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<UploadFileObject>(typeof value !== 'string' ? value : undefined);

  useEffect(() => {
    setFile(typeof value !== 'string' ? value : undefined);
  }, [value]);

  const handleOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventFiles = event.target.files;

      if (eventFiles === null || !eventFiles[0]) return;

      const file = eventFiles[0];
      const fileName = normalizeString(file.name);
      const base64 = await toBase64(file);

      const result: UploadFileObject = { base64, name: fileName, file };

      setFile(result);
      onChange(result);
    },
    [onChange]
  );

  const handleOnClick = useCallback(() => {
    inputElement.current.click();
  }, []);

  const handleOnRemove = useCallback(() => {
    setFile(undefined);
    onChange(null);

    inputElement.current.value = '';
  }, [onChange]);

  const src = useMemo(() => {
    if (typeof value === 'string') return value;
    if (file && typeof file.base64 === 'string') return file.base64;

    return NoImageSVG;
  }, [value, file]);

  return (
    <div className={cn('image-input', className)} style={style}>
      {!!label && (
        <label className="image-input__label" htmlFor={name}>
          {required ? `${label} *` : label}
        </label>
      )}

      <div className="image-input__field">
        <img src={src} />

        <div className="image-input__field__image-controls">
          <div className="image-input__field__image-controls-buttons">
            <Button size="lg" className="sign-in-form__submit" onClick={handleOnClick}>
              <Icon as={MdAdd} size={16} variant="secondary" />
              {formatMessage({ id: 'settings.account.profile.imageUrl.changeImage' })}
            </Button>

            <Button variant="secondary" onClick={handleOnRemove}>
              {formatMessage({ id: 'settings.account.profile.imageUrl.removeImage' })}
            </Button>

            <input
              ref={inputElement}
              name={name}
              type="file"
              multiple
              className="image-input__field-input"
              disabled={disabled}
              onChange={(event) => handleOnChange(event)}
              {...(allowedExtensions && { accept: allowedExtensions.join(',') })}
            />
          </div>

          <Text variant="body-s" color="contentDarkSecondary">
            {formatMessage({ id: 'settings.account.profile.imageUrl.supportMessage' })}
          </Text>
        </div>
      </div>

      {!!errorMessage && (
        <Text as="span" variant="body-s" color="interactionRedBase">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

ImageInput.displayName = 'ImageInput';

export default ImageInput;
