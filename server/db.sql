-- Active: 1713315852698@@127.0.0.1@5432@huellasapp

-- DROP FUNCTION public.calcular_costo_total_producto();

CREATE OR REPLACE FUNCTION public.calcular_costo_total_producto
() RETURNS trigger 
LANGUAGE plpgsql AS 
$function$
DECLARE
	
BEGIN
	
	NEW.costo_total := NEW.costo_unitario * NEW.existencia;
	
	RETURN NEW;
END;
$function$
;

create
or replace trigger tr_actualizar_costo_total_producto before insert
or
update on public.sabores for each row
execute function calcular_costo_total_producto ();

-- DROP FUNCTION public.actualizarExistenciaAlVender();
CREATE OR REPLACE FUNCTION public.actualizarExistenciaAlVender
() RETURNS trigger 
LANGUAGE plpgsql AS 
$function$
BEGIN
	UPDATE sabores
	SET
	    existencia = existencia - NEW.cantidad
	WHERE
	    id_sabor = NEW.id_sabor;

	RETURN NEW;
END;
$function$
;

create
or replace trigger tr_actualizarExistenciaAlVender
after insert on public.ventas for each row
execute function actualizarExistenciaAlVender ();

-- DROP FUNCTION public.eliminar_movimiento();

-- DROP FUNCTION public.eliminar_movimiento();

-- DROP FUNCTION public.eliminar_movimiento();

CREATE OR REPLACE FUNCTION public.eliminar_movimiento()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
	
 IF (OLD.tipo = 'Venta' OR OLD.tipo = 'Salida') THEN
        UPDATE sabores
        SET existencia = existencia + OLD.cantidad
        WHERE id_sabor = OLD.id_sabor;
    ELSIF (OLD.tipo = 'Entrada' or OLD.tipo ='Existencia Inicial') THEN
        UPDATE sabores
        SET existencia = existencia - OLD.cantidad
        WHERE id_sabor = OLD.id_sabor;
    END IF;
    RETURN NEW;
END;
$function$
;

create
or REPLACE trigger tr_eliminar_movimiento
after delete on public.movimientos for each row
execute function eliminar_movimiento ();

ALTER TABLE public.movimientos
ALTER COLUMN "createdAt"
SET DEFAULT now();

ALTER TABLE public.movimientos
ALTER COLUMN "updatedAt"
SET DEFAULT now();

-- DROP FUNCTION public.calcular_costo_total_producto();

--calcular al actualizar monedas

CREATE OR REPLACE FUNCTION public.actualizar_costo_productoMLC
() RETURNS trigger 
LANGUAGE plpgsql AS 
$function$
DECLARE
	usd decimal;
	euro decimal;
	mlc decimal;
	zelle decimal;
BEGIN
	SELECT new.precio INTO usd FROM monedas WHERE moneda = 'USD';
	SELECT new.precio INTO euro FROM monedas WHERE moneda = 'EURO';
	SELECT new.precio INTO mlc FROM monedas WHERE moneda = 'MLC';
	SELECT new.precio INTO zelle FROM monedas WHERE moneda = 'ZELLE';
	UPDATE sabores
	SET
	    costo_usd = costo_unitario / usd,
	    costo_euro = costo_unitario / euro,
	    costo_mlc = costo_unitario / mlc,
	    costo_zelle = costo_unitario / zelle;
	RETURN NEW;
END;
$function$
;

create
or replace trigger trMoneda_actualizar_costo_total_producto
after insert
or
update on public.monedas for each row
execute function actualizar_costo_productoMLC ();

create
or REPLACE trigger tr_insertar_movimi_existen_inicial
after insert on public.sabores for each row
execute function insertar_movi_existencia_inicial ();

-- DROP FUNCTION public.insertar_movi_existencia_inicial();
CREATE OR REPLACE FUNCTION public.insertar_movi_existencia_inicial()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$

BEGIN
	IF NEW.existencia > 0 THEN
		INSERT INTO movimientos (id_sabor, tipo, cantidad)
		VALUES (NEW.id_sabor, 'Existencia Inicial', NEW.existencia_inicial);
		
	END IF;
		RETURN NEW;
END;
$function$