import React from "react";
import styled from "styled-components";
import { Check, ImagePlus } from "lucide-react";
import placeholder from "../../assets/Dish_placeholder.jpg";

const Form = styled.form`
  color: #1f2937;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Field = styled.div``;

const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SmallLabel = styled(Label)`
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => (props.error ? "#f87171" : "#d1d5db")};
`;

const Select = styled.select`
  width: 100%;
  height: 120px;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => (props.error ? "#f87171" : "#d1d5db")};
  background-color: white;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => (props.error ? "#f87171" : "#d1d5db")};
`;

const Error = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  grid-column: span 2;
  padding: 0 1.5rem 1rem 0;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#16a34a" : "#e5e7eb")};
  color: ${(props) => (props.$primary ? "white" : "#1f2937")};

  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${(props) => (props.primary ? "#15803d" : "#d1d5db")};
  }
`;

const ImageWrapper = styled.div`
  text-align: center;
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
  }
  button {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    background: #d1d5db;
    padding: 0.4rem 0.75rem;
    border-radius: 0.375rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    &:hover {
      background: #9ca3af;
      color: white;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const DishForm = ({ formData, errors, onChange, onSave, onCancel }) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      {/* Left Column */}
      <Column>
        <Field>
          <Label htmlFor="title">
            Titel <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="F.eks. Kylling med karry"
            value={formData.title}
            onChange={onChange}
            error={errors.title}
          />
          {errors.title && <Error>{errors.title}</Error>}
        </Field>

        <Field>
          <Label htmlFor="description">
            Beskrivelse <span style={{ color: "red" }}>*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Beskriv retten..."
            rows="3"
            value={formData.description}
            onChange={onChange}
            error={errors.description}
          />
          {errors.description && <Error>{errors.description}</Error>}
        </Field>

        <Field>
          <Label htmlFor="ingredients">
            Ingredienser <span style={{ color: "red" }}>*</span>
          </Label>
          <Textarea
            id="ingredients"
            name="ingredients"
            placeholder="Skriv hver ingrediens på en ny linje"
            rows="4"
            value={formData.ingredients}
            onChange={onChange}
            error={errors.ingredients}
          />
          {errors.ingredients && <Error>{errors.ingredients}</Error>}
        </Field>

        <Field>
          <Label htmlFor="recipe">
            Opskrift <span style={{ color: "red" }}>*</span>
          </Label>
          <Textarea
            id="recipe"
            name="recipe"
            placeholder="Skriv hvert trin på en ny linje"
            rows="5"
            value={formData.recipe}
            onChange={onChange}
            error={errors.recipe}
          />
          {errors.recipe && <Error>{errors.recipe}</Error>}
        </Field>
      </Column>

      {/* Right Column */}
      <Column>
        <ImageWrapper>
          <img src={placeholder} alt="Dish placeholder" />
          <button type="button">
            <ImagePlus size={16} />
            Rediger billede
          </button>
        </ImageWrapper>

        <Field>
          <SmallLabel>
            Ernæringsinfo <span style={{ color: "red" }}>*</span>
          </SmallLabel>
          <Grid>
            {[
              { key: "calories", label: "Kalorier (kcal)" },
              { key: "protein", label: "Protein (g)" },
              { key: "carbs", label: "Kulhydrater (g)" },
              { key: "fat", label: "Fedt (g)" },
            ].map(({ key, label }) => (
              <div key={key}>
                <SmallLabel htmlFor={key}>{label}</SmallLabel>
                <Input
                  type="number"
                  id={key}
                  name={key}
                  placeholder={`F.eks. ${
                    key === "calories"
                      ? "350"
                      : key === "protein"
                      ? "25"
                      : key === "carbs"
                      ? "40"
                      : "12"
                  }`}
                  value={formData[key]}
                  onChange={onChange}
                  error={errors[key]}
                />
                {errors[key] && <Error>{errors[key]}</Error>}
              </div>
            ))}
          </Grid>
        </Field>

        <Field>
          <SmallLabel htmlFor="allergens">
            Allergener <span style={{ color: "red" }}>*</span>
          </SmallLabel>
          <Select
            id="allergens"
            name="allergens"
            multiple
            value={Array.isArray(formData.allergens) ? formData.allergens : []}
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              onChange({ target: { name: "allergens", value: selected } });
            }}
            error={errors.allergens}
          >
            <option value="LAKTOSE">Mælk</option>
            <option value="GLUTEN">Gluten</option>
            <option value="NUTS">Nødder</option>
            <option value="EGG">Æg</option>
            <option value="FISH">Fisk</option>
            <option value="SHELLFISH">Skaldyr</option>
          </Select>
          {errors.allergens && <Error>{errors.allergens}</Error>}
        </Field>
      </Column>

      {/* Buttons */}
      <ButtonGroup>
        <Button type="button" onClick={onCancel}>
          Annuller
        </Button>
        <Button type="submit" $primary>
          <Check style={{ marginRight: "0.5rem" }} />
          Gem
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default DishForm;
