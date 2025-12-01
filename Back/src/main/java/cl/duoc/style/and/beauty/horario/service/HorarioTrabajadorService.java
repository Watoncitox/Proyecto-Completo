package cl.duoc.style.and.beauty.horario.service;

import cl.duoc.style.and.beauty.horario.dto.HorarioTrabajadorDTO;
import cl.duoc.style.and.beauty.horario.dto.HorarioTrabajadorRequestDTO;
import cl.duoc.style.and.beauty.horario.model.HorarioTrabajador;
import cl.duoc.style.and.beauty.horario.repository.HorarioTrabajadorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HorarioTrabajadorService {

    private final HorarioTrabajadorRepository repository;

    public HorarioTrabajadorService(HorarioTrabajadorRepository repository) {
        this.repository = repository;
    }

    private HorarioTrabajadorDTO toDTO(HorarioTrabajador h) {
        HorarioTrabajadorDTO dto = new HorarioTrabajadorDTO();
        dto.setId(h.getId());
        dto.setIdTrabajador(h.getIdTrabajador());
        dto.setDiaSemana(h.getDiaSemana());
        dto.setHoraInicioMin(h.getHoraInicioMin());
        dto.setHoraFinMin(h.getHoraFinMin());
        return dto;
    }

    private HorarioTrabajador toEntity(HorarioTrabajadorRequestDTO dto) {
        HorarioTrabajador h = new HorarioTrabajador();
        h.setIdTrabajador(dto.getIdTrabajador());
        h.setDiaSemana(dto.getDiaSemana());
        h.setHoraInicioMin(dto.getHoraInicioMin());
        h.setHoraFinMin(dto.getHoraFinMin());
        return h;
    }

    public List<HorarioTrabajadorDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public HorarioTrabajadorDTO findById(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public HorarioTrabajadorDTO save(HorarioTrabajadorRequestDTO dto) {
        HorarioTrabajador h = toEntity(dto);
        return toDTO(repository.save(h));
    }

    public HorarioTrabajadorDTO update(Long id, HorarioTrabajadorRequestDTO dto) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setIdTrabajador(dto.getIdTrabajador());
                    existing.setDiaSemana(dto.getDiaSemana());
                    existing.setHoraInicioMin(dto.getHoraInicioMin());
                    existing.setHoraFinMin(dto.getHoraFinMin());
                    return toDTO(repository.save(existing));
                })
                .orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
